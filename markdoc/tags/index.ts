// Copyright (c) ZeroC, Inc. All rights reserved.

import sideBySide from './side-by-side.markdoc';
import { linkCard } from './mini-card.markdoc';
import { languageSection, languageSelector } from './languages.markdoc';

export * from './flow.markdoc';
export * from './title.markdoc';
export * from './grid.markdoc';
export * from './card.markdoc';
export * from './hero.markdoc';
export * from './divider.markdoc';

export { default as section } from './section.markdoc';

module.exports['side-by-side'] = sideBySide;
module.exports['mini-card'] = linkCard;
module.exports['language-section'] = languageSection;
module.exports['language-selector'] = languageSelector;
