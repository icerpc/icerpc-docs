// Copyright (c) ZeroC, Inc.

import { Config } from '@markdoc/markdoc';

// Nodes
import { Document } from 'components/Nodes/Document';
import { CodeBlock, AppLink, Heading, List } from 'components';
import { TH, TR, TD, Table } from 'components/Nodes/Table';

// Tags
import { Callout } from 'components/Tags/Callout';
import { Card } from 'components/Tags/Card';
import { ConditionalTheme } from 'components/Tags/ConditionalTheme';
import { Divider } from 'components/Divider';
import { Examples } from 'components/Tags/Examples';
import { Explore } from 'components/Tags/Explore';
import { Grid } from 'components/Tags/Grid';
import { HomeTitle } from 'components/Tags/HomeTitle';
import { IcerpcSlice } from 'components';
import { LanguageSection } from 'components/Tags/LanguageSection';
import { LanguageSelector } from 'components/Tags/LanguageSelector';
import { License } from 'components/Tags/License';
import { ModeSection } from 'components/Tags/ModeSection';
import { SideBySide } from 'components/Tags/SideBySide';
import { Step } from 'components/Tags/Step';
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
  AppLink,
  Callout,
  Card,
  CodeBlock,
  ConditionalTheme,
  Divider,
  Document,
  Examples,
  Explore,
  Grid,
  Heading,
  HomeTitle,
  IcerpcSlice,
  LanguageSection,
  LanguageSelector,
  License,
  List,
  ModeSection,
  SideBySide,
  Step,
  Table,
  TD,
  TH,
  Title,
  TR
};

export default config;
