import { useCallback, useMemo } from "react"
import { Handle, Node, Position } from "reactflow"
import Dropdown from "../Dropdown"
import { onAddNode, onUpdateNode } from "../../features/flow/flowSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import styles from "./index.module.css"

export default function CustomNode(props: Node) {
  const dispatch = useAppDispatch()

  const lastNodeIndex = useAppSelector((state) => state.flow.nodes).length

  const nodeId = useMemo(() => {
    return props.id
  }, [props.id])

  const onChange = useCallback(
    (items: number[]) => {
      dispatch(onUpdateNode({ id: nodeId, data: items }))
    },
    [dispatch, nodeId],
  )

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={styles.container}>
        <Dropdown onChange={onChange} savedValues={props.data.values} />
        {+props.id === lastNodeIndex && (
          <button onClick={() => dispatch(onAddNode())}>Add Node</button>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  )
}
