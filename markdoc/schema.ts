// Copyright (c) ZeroC, Inc.

import { Config } from '@markdoc/markdoc';

// Nodes
import { Document } from 'components/Nodes/Document';
import { CodeBlock, AppLink, Heading, List } from 'components';
import { TH, TR, TD } from 'components/Nodes/Table';

// Tags
import { Callout } from 'components/Tags/Callout';
import { ConditionalTheme } from 'components/Tags/ConditionalTheme';
import { Divider } from 'components/Divider';
import { EncodingSection } from 'components/Tags/EncodingSection';
import { SupportedEncodings } from 'components/Tags/SupportedEncoding';
import { Grid } from 'components/Tags/Grid';
import { LanguageSection } from 'components/Tags/LanguageSection';
import { LanguageSelector } from 'components/Tags/LanguageSelector';
import { Card } from 'components/Tags/Card';
import { SideBySide } from 'components/Tags/SideBySide';
import { Title } from 'components/Tags/Title';

import * as nodes from './nodes';
import * as tags from './tags';

const config: Config = {
  tags: {
    ...tags
  },
  nodes: {
    ...nodes
  },
  variables: {}
};

export const components = {
  Callout,
  ConditionalTheme,
  Divider,
  EncodingSection,
  SupportedEncodings,
  Grid,
  LanguageSection,
  LanguageSelector,
  Card,
  SideBySide,
  Title,
  CodeBlock,
  AppLink,
  Heading,
  List,
  Document,
  TH,
  TR,
  TD
};

export default config;
