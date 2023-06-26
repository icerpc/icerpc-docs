// Copyright (c) ZeroC, Inc.

import sideBySide from './side-by-side.markdoc';
import { linkCard, miniCard } from './mini-card.markdoc';
import { languageSection, languageSelector } from './languages.markdoc';

export { default as encodings } from './encodings.markdoc';
export { default as title } from './title.markdoc';
export { default as grid } from './grid.markdoc';
export { default as callout } from './callout.markdoc';
export { default as divider } from './divider.markdoc';
export { slice1, slice2 } from './encoding-section.markdoc';

module.exports['side-by-side'] = sideBySide;
module.exports['link-card'] = linkCard;
module.exports['mini-card'] = miniCard;
module.exports['language-section'] = languageSection;
module.exports['language-selector'] = languageSelector;
