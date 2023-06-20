import React, { useMemo } from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
  resetNodes,
} from "./flowSlice"
import ReactFlow from "reactflow"

import CustomNode from "../../components/CustomNode"

import "reactflow/dist/style.css"

export default function ReactFlowFeature() {
  const dispatch = useAppDispatch()
  const nodes = useAppSelector((state) => state.flow.nodes)
  const edges = useAppSelector((state) => state.flow.edges)

  const nodeTypes = useMemo(() => ({ selector: CustomNode }), [])

  return (
    <>
      <button onClick={() => dispatch(resetNodes())}>Reset Flow</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(e) => dispatch(onNodesChange(e))}
        onEdgesChange={(e) => dispatch(onEdgesChange(e))}
        onConnect={(e) => dispatch(onConnect(e))}
        /* @ts-ignore */
        nodeTypes={nodeTypes}
      />
    </>
  )
}
