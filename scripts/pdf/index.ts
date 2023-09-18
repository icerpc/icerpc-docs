// Copyright (c) ZeroC, Inc.

/// <reference lib="dom" />

import fs from 'fs';
import { spawn } from 'child_process';
import { program } from 'commander';
import { createPDF } from './generatePdf';
import contentMap from '../../data/contentMap.json';

const outputDir = './output';
const outputName = 'IceRPC_docs';

// SIGINT handler
process.on('SIGINT', () => {
  server.kill();
  removeExistingOutput();
  process.exit();
});

// Parse command line arguments
program
  .version('1.0.0')
  .option('-f, --format <type>', 'PDF format (e.g., "A4", "Letter")', 'Letter')
  .option('--margin-top <value>', 'Top margin', '0')
  .option('--margin-right <value>', 'Right margin', '0')
  .option('--margin-bottom <value>', 'Bottom margin', '0')
  .option('--margin-left <value>', 'Left margin', '0')
  .parse(process.argv);
const options = program.opts();

// Prepare output directory
initializeOutput();

// Spawn the docs server
console.log('Running "npm run dev" to start the docs server...');
const server = spawn('npm', ['run', 'dev']);

server.stdout.on('data', async (data) => {
  const match = data.toString().match(/localhost:(\d+)/);
  if (match) {
    const port = parseInt(match[1]);
    console.log(`Server is running on port ${port}`);

    // Generate PDF
    await createPDF(contentMap, options, outputDir, outputName, port);

    server.kill();
    process.exit();
  }
});

function initializeOutput() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }
  removeExistingOutput();
}

function removeExistingOutput() {
  // Temporary files
  if (fs.existsSync(`${outputDir}/merged_document.pdf`)) {
    fs.unlinkSync(`${outputDir}/merged_document.pdf`);
  }
  // Final output
  if (fs.existsSync(`${outputDir}/${outputName}.pdf`)) {
    fs.unlinkSync(`${outputDir}/${outputName}.pdf`);
  }
}
