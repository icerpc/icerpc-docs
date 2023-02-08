// Copyright (c) ZeroC, Inc.

import { LanguageSection } from 'components/LanguageSection';
import { LanguageSelector } from 'components/LanguageSelector';
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
