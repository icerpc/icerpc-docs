// Copyright (c) ZeroC, Inc.
//
// Load Markdoc's ES module build under plain Node.
//
// The package ships one — `module` in its package.json — but declares no
// `exports`, so Node picks the CommonJS build and cannot see its named exports:
// `import { Tag } from '@markdoc/markdoc'` fails outside a bundler. This hook
// sends that specifier to the ES module build instead, which is the one Next
// bundles. `npm test` registers it with `--import`.

import { registerHooks } from 'node:module';

registerHooks({
  resolve: (specifier, context, next) =>
    next(
      specifier === '@markdoc/markdoc'
        ? '@markdoc/markdoc/dist/index.mjs'
        : specifier,
      context
    )
});
