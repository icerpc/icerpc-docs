// Copyright (c) ZeroC, Inc.

import { Config } from '@markdoc/markdoc';

// Nodes
import { Document } from '@/components/nodes/document';
import { CodeBlock, AppLink, Heading, List } from 'components';
import { TH, TR, TD, Table } from '@/components/nodes/table';

// Tags
import { Callout } from '@/components/tags/callout';
import { Card } from '@/components/tags/card';
import { Divider } from '@/components/divider';
import { Examples } from '@/components/tags/examples';
import { Explore } from '@/components/tags/explore';
import { Grid } from '@/components/tags/grid';
import { HomeTitle } from '@/components/tags/home-title';
import { IcerpcSlice } from 'components';
import { License } from '@/components/tags/license';
import { ModeSection } from '@/components/tags/mode-section';
import { Aside } from '@/components/tags/aside';
import { Step } from '@/components/tags/step';
import { Title } from '@/components/tags/title';

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
  Divider,
  Document,
  Examples,
  Explore,
  Grid,
  Heading,
  HomeTitle,
  IcerpcSlice,
  License,
  List,
  ModeSection,
  Aside,
  Step,
  Table,
  TD,
  TH,
  Title,
  TR
};

export default config;
