// Copyright (c) ZeroC, Inc. All rights reserved.

import { CSSProperties } from 'react';
import ReactFlow, { Node, Edge, ConnectionLineType, Background, Controls } from 'reactflow';

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

function Flow({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) {
  return (
    nodes && (
      <div className="container" style={{ height: 400, width: '100%' }}>
        <ReactFlow
          style={reactFlowStyle}
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
}

export default Flow;
