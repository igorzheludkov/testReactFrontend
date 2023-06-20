import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { nodesState, edgesState } from "./state"
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow"

export interface NodesState {
  nodes: Node[]
  edges: Edge[]
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
}

export interface NodeUpdate {
  id: string
  data: any
}

export const flowSlice = createSlice({
  name: "flow",
  initialState: { nodes: nodesState, edges: edgesState },
  reducers: {
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes)
    },
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges)
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      // state.edges = addEdge(action.payload, state.edges)
    },
    onAddNode: (state) => {
      const lastNode = state.nodes[state.nodes.length - 1]

      state.nodes.push({
        id: `${state.nodes.length + 1}`,
        type: "selector",
        data: {
          label: state.nodes.length.toString(),
          values: lastNode.data.values,
        },
        position: {
          x: lastNode.position.x + 100,
          y: lastNode.position.y + 200,
        },
      })
      state.edges.push({
        id: `e-${state.edges.length + 1}-${state.edges.length + 2}`,
        source: `${state.nodes.length - 1}`,
        target: `${state.nodes.length}`,
      })
    },
    onUpdateNode: (state, action: PayloadAction<NodeUpdate>) => {
      for (let i = +action.payload.id - 1; i < state.nodes.length; i++) {
        state.nodes[i].data.values = action.payload.data
      }
    },
    resetNodes: (state) => {
      state.nodes = nodesState
      state.edges = edgesState
    },
  },
})

export const {
  onNodesChange,
  onEdgesChange,
  onConnect,
  onAddNode,
  onUpdateNode,
  resetNodes,
} = flowSlice.actions

export default flowSlice.reducer
