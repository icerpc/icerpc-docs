# IceRPC Docs

This repository contains the source code and markdown files for the IceRPC documentation site.

## Build Requirements

You'll need Node.js and npm installed to build the documentation site. To
install node, it is recommended to follow the guide provided by Node.js
[here](https://nodejs.org/en/download/package-manager).

## Building

1. **Install Dependencies:** Run the following command to install the necessary packages.

   ```bash
   npm install
   ```

2. **Start the Development Server:** Use the command below to start the dev server.

   ```bash
   npm run dev
   ```

## Writing Documentation

For comprehensive guidelines on writing documentation, including how to use custom nodes and tags, please refer to the
[Writing Documentation](/WRITING_DOCS.md) page.

## Generating a PDF

This repository provides a tool for generating a PDFs from the documentation using [puppeteer](https://pptr.dev).
To run the tool, use the following commands:

```bash
cd tools/pdf
npm install
npm run generate-pdf
```
