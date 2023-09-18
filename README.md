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

To generate a PDF of the documentation, use the `PDF` tool in `/tools/pdf`. This is a simple script that uses
[puppeteer](https://pptr.dev) to generate a PDF of the documentation site. To use the tool, run the following command:

```bash
cd tools/pdf
npm install
npm run generate-pdf
```
