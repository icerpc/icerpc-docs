// Copyright (c) ZeroC, Inc.

import sideBySide from './side-by-side.markdoc';
import { linkCard, miniCard } from './mini-card.markdoc';
import { languageSection, languageSelector } from './languages.markdoc';
import { sliceVersionSection } from './slice-version.markdoc';

export * from './title.markdoc';
export * from './grid.markdoc';
export * from './card.markdoc';
export * from './hero.markdoc';
export * from './divider.markdoc';
export * from './callout.markdoc';

export { default as section } from './section.markdoc';

module.exports['side-by-side'] = sideBySide;
module.exports['link-card'] = linkCard;
module.exports['mini-card'] = miniCard;
module.exports['language-section'] = languageSection;
module.exports['language-selector'] = languageSelector;
module.exports['slice-section'] = sliceVersionSection;
