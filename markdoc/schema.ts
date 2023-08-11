// Copyright (c) ZeroC, Inc.

import { Config } from '@markdoc/markdoc';

// Nodes
import { Document } from 'components/Nodes/Document';
import { CodeBlock, AppLink, Heading, List } from 'components';
import { TH, TR, TD, Table } from 'components/Nodes/Table';

// Tags
import { Callout } from 'components/Tags/Callout';
import { ConditionalTheme } from 'components/Tags/ConditionalTheme';
import { Divider } from 'components/Divider';
import { ModeSection } from 'components/Tags/ModeSection';
import { Grid } from 'components/Tags/Grid';
import { LanguageSection } from 'components/Tags/LanguageSection';
import { LanguageSelector } from 'components/Tags/LanguageSelector';
import { Card } from 'components/Tags/Card';
import { SideBySide } from 'components/Tags/SideBySide';
import { Title } from 'components/Tags/Title';
import { IcerpcSlice } from 'components';
import { Examples } from 'components/Tags/Examples';
import { HomeTitle } from 'components/Tags/HomeTitle';
import { Explore } from 'components/Tags/Explore';

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
  List,
  ModeSection,
  SideBySide,
  Table,
  TD,
  TH,
  Title,
  TR
};

export default config;
