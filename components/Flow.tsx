// Copyright (c) ZeroC, Inc. All rights reserved.

import { CSSProperties } from 'react';
import { useTheme } from 'next-themes';
import ReactFlow, {
  Node,
  Edge,
  ConnectionLineType,
  Background,
  Controls
} from 'reactflow';

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep'
};

const reactFlowStyle: CSSProperties = {
  border: '1px solid #eee',
  borderRadius: 10,
  background: '#f8f9fa',
  margin: '2em 0',
  fontSize: 12
};

const darkReactFlowStyle: CSSProperties = {
  border: '1px solid #31363C',
  borderRadius: 10,
  background: '#1E2125',
  margin: '2em 0',
  fontSize: 12
};

export const Flow = ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
  const { resolvedTheme } = useTheme();
  return (
    nodes && (
      <div className="h-[300px] w-full">
        <ReactFlow
          style={resolvedTheme === 'dark' ? darkReactFlowStyle : reactFlowStyle}
          nodes={nodes}
          edges={edges}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          snapToGrid
          fitViewOptions={{ padding: 0.1, maxZoom: 1 }}
        >
          <Background />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    )
  );
};

export default Flow;
