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

## Linting and Formatting

CI fails a pull request on any ESLint error or warning, and on any file Prettier would reformat, Markdown pages
included.

```bash
npm run lint          # ESLint
npm run format        # reformat every file with Prettier
npm run format:check  # list the files Prettier would reformat
```

## Writing Documentation

For comprehensive guidelines on writing documentation, including how to use custom nodes and tags, please refer to the
[Writing Documentation](/WRITING_DOCS.md) page.
