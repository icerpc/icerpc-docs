// Copyright (c) ZeroC, Inc. All rights reserved.

export default function Grid({ children, columns, rows }) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridGap: '1em'
  };
  return <div style={gridStyle}>{children}</div>;
}
