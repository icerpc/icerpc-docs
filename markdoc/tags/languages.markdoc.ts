// Copyright (c) ZeroC, Inc.

import { LanguageSection } from 'components/Tags/LanguageSection';
import { LanguageSelector } from 'components/Tags/LanguageSelector';
import { Platform } from 'types';

export const languageSelector = {
  render: LanguageSelector,
  attributes: {
    languages: {
      type: [Platform],
      required: true
    }
  }
};

export const languageSection = {
  render: LanguageSection,
  attributes: {
    language: {}
  }
};
