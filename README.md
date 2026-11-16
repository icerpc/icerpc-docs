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

## Testing

`npm test` runs the unit tests under `lib/` with Node's built-in test runner. CI runs them on every pull request.

## Markdown Copies

Every page is also served as Markdown, for agents and crawlers, at its URL with `.md` appended, and `/llms.txt` lists
every page by section. `lib/page-markdown.ts` renders them, through the route under `app/md/`, and
`lib/plain-markdown.ts` writes a page's Markdoc tree as CommonMark.

## Writing Documentation

For comprehensive guidelines on writing documentation, including how to use custom nodes and tags, please refer to the
[Writing Documentation](/WRITING_DOCS.md) page.
