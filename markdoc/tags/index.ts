// Copyright (c) ZeroC, Inc.

import { languageSection, languageSelector } from './languages.markdoc';
import { lightMode, darkMode } from './conditional-theme.markdoc';
import { miniCard } from './mini-card.markdoc';
import { examples } from './examples.markdoc';
import { explore } from './explore.markdoc';
import { step } from './step.markdoc';

import sideBySide from './side-by-side.markdoc';

export { default as homeTitle } from './home-title.markdoc';
export { default as callout } from './callout.markdoc';
export { default as divider } from './divider.markdoc';
export { default as grid } from './grid.markdoc';
export { default as title } from './title.markdoc';
export { slice1, slice2 } from './mode-section.markdoc';

module.exports['step'] = step;
module.exports['explore'] = explore;
module.exports['examples'] = examples;
module.exports['dark-mode'] = darkMode;
module.exports['light-mode'] = lightMode;
module.exports['language-section'] = languageSection;
module.exports['language-selector'] = languageSelector;

// // module.exports['link-card'] = linkCard;
module.exports['mini-card'] = miniCard;
module.exports['side-by-side'] = sideBySide;
