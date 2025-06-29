import { NodeData, NodeEditorData } from "../Node/FlowNode.types";

export interface FlowGraphEditorData {
  x: number;
  y: number;
  zoom: number;
  locations: NodeEditorData[];
}

export interface FlowGraphData {
  type: string;
  outputNodeId: number;
  editorData: FlowGraphEditorData;
  nodes: NodeData[];
}
