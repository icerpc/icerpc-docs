// Copyright (c) ZeroC, Inc.

// cSpell:words lillallol

import fs from 'fs';
import puppeteer, { PDFOptions, Page as PuppeteerPage } from 'puppeteer';
import { OptionValues } from 'commander';
import { outlinePdfCjs } from '@lillallol/outline-pdf-cjs';
import { PDFDocument } from 'pdf-lib';
import { flattenContentMap } from '../../data';
import { SideBarSourceType } from '../../types';

type Page = {
  path: string;
  title: string;
};

type Section = {
  title: string;
  startingPage: number;
  endingPage: number;
  level: number;
};

type pdfData = {
  pdfs: Buffer[];
  sections: Section[];
};

export async function createPDF(
  contentMap: { [x: string]: SideBarSourceType[] },
  options: OptionValues,
  outputDir: string,
  outputName: string,
  port: number
) {
  // Initialize pages
  let pages: Page[] = [{ path: '/', title: 'Home' }];
  Object.keys(contentMap).forEach((key) => {
    const data = flattenContentMap(key, contentMap);
    pages = [
      ...pages,
      ...data.map((item) => ({ path: item.path, title: item.title }))
    ];
  });

  // Generate PDF
  await generatePDFs(pages, options, port).then(async ({ pdfs, sections }) => {
    console.log('Merging PDFs...');
    await mergePdfs(pdfs, sections, outputDir, outputName).catch((error) => {
      console.error('Error while merging PDFs:', error);
    });
  });
  console.log('Done');
}

// Initialize cookies and viewport
async function initializeBrowser(page: PuppeteerPage, port: number) {
  // Set cookies and viewport
  // Disables the cookie banner
  await page.setCookie({
    name: 'allow_cookies',
    value: 'true',
    domain: `localhost:${port}`,
    path: '/',
    expires: Math.floor(Date.now() / 1000) + 60 * 60
  });
  await page.setViewport({
    width: 8.5 * 96,
    height: 11 * 96,
    deviceScaleFactor: 1
  });
}

// Generate PDFs for each page
async function generatePDFs(
  pages: Page[],
  options: OptionValues,
  port: number
): Promise<pdfData> {
  const pdfs: Buffer[] = []; // hold generated PDFs
  const sections: Section[] = []; // hold sections
  let currentSubsection = ''; // hold current subsection
  const pdfOptions: PDFOptions = {
    format: options.format ?? undefined,
    margin: {
      top: options.marginTop,
      right: options.marginRight,
      bottom: options.marginBottom,
      left: options.marginLeft
    }
  };

  const initializeSection = async (
    pdf: Buffer,
    path: string,
    level: number,
    title: string
  ) => {
    const pdfDoc = await PDFDocument.load(pdf);
    const pageCount = pdfDoc.getPageCount();
    const startingPage =
      sections.length > 0 ? sections[sections.length - 1].endingPage + 1 : 0;

    const sectionTitle =
      level == 0
        ? path.split('/')[1]?.split('-').map(caseFixer).join(' ') || 'Home'
        : title;

    const section: Section = {
      title: sectionTitle,
      startingPage,
      endingPage: startingPage + pageCount - 1,
      level
    };

    // Determine if the section is a subsection
    // Handle subsections
    if (level === 2) {
      const parts = path.split('/').filter(String);
      const subsection = parts[parts.length - 2];
      const subsectionTitle = subsection
        .split('-')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');

      if (subsection !== currentSubsection) {
        // Add a section for the subsection
        const subSection = {
          title: subsectionTitle,
          startingPage,
          endingPage: startingPage,
          level: 1
        };
        currentSubsection = subsection;
        sections.push(subSection);
      }
    }

    sections.push(section);
  };

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--disable-features=site-per-process']
  });
  const page = await browser.newPage();

  // Initialize cookies and viewport
  await initializeBrowser(page, port);

  console.log('Generating PDFs...');
  for (const docPage of pages) {
    // Generate PDF for each documentation page
    const { path, title } = docPage;
    const url = `http://localhost:${port}${path}`;
    const level = getRouteLevel(path);

    // Capture the page as a PDF using Puppeteer
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await applyPageStyles(page, path);

    try {
      const pdf = await page.pdf(pdfOptions);
      // Gather additional context about the PDF using PDF-Lib. This is used
      // to generate the outline.
      await initializeSection(pdf, path, level, title);

      console.log(`Generated PDF for: ${path}`);
      pdfs.push(pdf);
    } catch (error) {}
  }
  await browser.close();
  return { pdfs, sections };

  async function applyPageStyles(page: PuppeteerPage, path: string) {
    await page.addStyleTag({
      content: `html { -webkit-print-color-adjust: exact !important; -webkit-filter: opacity(1) !important; }`
    });

    await page.evaluate(() => {
      const feedbackElement: HTMLElement | null =
        document.querySelector('#Feedback');
      if (feedbackElement) feedbackElement.style.display = 'none';
    });

    await page.evaluate((isHome) => {
      const navDiv: HTMLElement | null = document.querySelector(
        'div.fixed.top-0.z-10'
      );
      const targetDiv: HTMLElement | null =
        document.querySelector('main > div');
      if (navDiv) navDiv.style.position = 'relative';
      if (targetDiv && !isHome) targetDiv.style.marginTop = '0';
    }, path === '/');
  }
}

// Merge PDFs and add outline
async function mergePdfs(
  pdfs: Buffer[],
  sections: Section[],
  outputDir: string,
  outputName: string
) {
  const pdfDoc = await PDFDocument.create();

  // Merge all PDFs
  for (const pdfBytes of pdfs) {
    const existingPdfDoc = await PDFDocument.load(pdfBytes);
    const pageCount = existingPdfDoc.getPageCount();
    for (let i = 0; i < pageCount; i++) {
      const [pdfPage] = await pdfDoc.copyPages(existingPdfDoc, [i]);
      pdfDoc.addPage(pdfPage);
    }
  }

  // Add metadata
  pdfDoc.setTitle('IceRPC Documentation');
  pdfDoc.setAuthor('ZeroC, Inc.');
  pdfDoc.setSubject('IceRPC Documentation');
  pdfDoc.setKeywords(['IceRPC', 'documentation']);
  pdfDoc.setLanguage('en');
  pdfDoc.setCreationDate(new Date());

  // Serialize and save
  ('Saving merged PDF...');
  const mergedPdfBytes = await pdfDoc.save();
  fs.writeFileSync(`${outputDir}/merged_document.pdf`, mergedPdfBytes);

  // Add outline and finalize
  await outlinePdfCjs({
    loadPath: `${outputDir}/merged_document.pdf`,
    savePath: `${outputDir}/${outputName}.pdf`,
    outline: generateOutline(sections)
  });

  console.log('Cleaning up ...');
  // Clean up
  fs.unlinkSync(`${outputDir}/merged_document.pdf`);
}

// Generate outline
function generateOutline(sections: Section[]) {
  let outlineString = '';

  for (const section of sections) {
    const startPage = section.startingPage + 1; // Assuming pages are 0-indexed
    const depth = '-'.repeat(section.level);
    const title = section.title;

    outlineString += `${startPage}|${depth}|${title}\n`;
  }

  return outlineString.trim();
}

// Helper to get the route level
function getRouteLevel(route: string) {
  const parts = route.split('/').filter(String);
  return parts.length > 0 ? parts.length - 1 : 0;
}

// Helper to fix the case of a string
function caseFixer(str: string) {
  const capitalize = (s: string) =>
    (s && s[0].toUpperCase() + s.slice(1)) || '';

  // Capitalize the first letter of each word
  str = capitalize(str);

  // Convert any Icerpc in the title to IceRPC
  str = str.replace('Icerpc', 'IceRPC');

  return str;
}
