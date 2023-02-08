// Copyright (c) ZeroC, Inc.

import { nodes } from '@markdoc/markdoc';
import { Table, TH, TR, TD } from 'components/Nodes/Table';

export const table = {
  render: Table,
  attributes: nodes.table.attributes
};

export const th = {
  render: TH,
  attributes: nodes.th.attributes
};

export const tr = {
  render: TR,
  attributes: nodes.tr.attributes
};

export const td = {
  render: TD,
  attributes: nodes.td.attributes
};
