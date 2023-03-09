// Copyright (c) ZeroC, Inc.

import sideBySide from './side-by-side.markdoc';
import { linkCard, miniCard } from './mini-card.markdoc';
import { languageSection, languageSelector } from './languages.markdoc';

export { default as encodings } from './encodings.markdoc';
export { default as title } from './title.markdoc';
export { default as grid } from './grid.markdoc';
export { default as callout } from './callout.markdoc';
export { default as card } from './card.markdoc';
export { default as hero } from './hero.markdoc';
export { default as divider } from './divider.markdoc';
export { default as section } from './section.markdoc';
export { slice1, slice2 } from './slice-version.markdoc';

module.exports['side-by-side'] = sideBySide;
module.exports['link-card'] = linkCard;
module.exports['mini-card'] = miniCard;
module.exports['language-section'] = languageSection;
module.exports['language-selector'] = languageSelector;
