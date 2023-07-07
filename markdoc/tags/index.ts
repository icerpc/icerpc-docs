// Copyright (c) ZeroC, Inc.

import { languageSection, languageSelector } from './languages.markdoc';
import { lightMode, darkMode } from './conditional-theme.markdoc';
import { miniCard } from './mini-card.markdoc';
// import { linkCard } from './link-card.markdoc';

import sideBySide from './side-by-side.markdoc';

export { default as callout } from './callout.markdoc';
export { default as divider } from './divider.markdoc';
export { default as encodings } from './encodings.markdoc';
export { default as grid } from './grid.markdoc';
export { default as title } from './title.markdoc';
export { slice1, slice2 } from './encoding-section.markdoc';

module.exports['dark-mode'] = darkMode;
module.exports['language-section'] = languageSection;
module.exports['language-selector'] = languageSelector;
module.exports['light-mode'] = lightMode;
// module.exports['link-card'] = linkCard;
module.exports['mini-card'] = miniCard;
module.exports['side-by-side'] = sideBySide;
