
import fs from 'fs';
import path from 'path';

export function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const absolutePath = path.join(dirPath, file);

    if (fs.statSync(absolutePath).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(absolutePath, arrayOfFiles);
    } else if (file.endsWith('.md')) {
      arrayOfFiles.push(absolutePath);
    }
  });

  return arrayOfFiles;
}