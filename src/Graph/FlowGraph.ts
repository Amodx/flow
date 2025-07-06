import { NodeData, NodeEditorData } from "../Node/FlowNode.types";
import { FlowNode } from "../Node/FlowNode";
import { FlowGraphData, FlowGraphEditorData } from "./FlowGraph.types";

export class FlowGraph {
  static CreateNode(data: Partial<NodeData>): NodeData {
    return {
      id: -1,
      name: "",
      type: "",
      inputs: [],
      outputs: [],
      properties: {},
      meta: {},
      ...data,
    };
  }
  type: string;
  outputNodeId: number;
  editorData: FlowGraphEditorData;
  nodes: (FlowNode | null)[] = [];

  private _free: number[] = [];
  private _nodeCount = 0;

  constructor(data: FlowGraphData) {
    this.fromJSON(data);
  }

  addNode(nodeData: NodeData): FlowNode {
    if (nodeData.id == -1) {
      if (this._free.length) {
        nodeData.id = this._free.shift()!;
      } else {
        nodeData.id = this._nodeCount;
        this._nodeCount++;
      }
    }

    const node = new FlowNode(this, nodeData);
    this.nodes[node.id] = node;

    return node;
  }

  getNode(id: number): FlowNode | null {
    const node = this.nodes[id];
    if (!node) return null;
    return node;
  }

  removeNode(id: number): boolean {
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      if (!node || node.id !== id) continue;
      this.nodes[i] = null;
      this._free.push(i);
      return true;
    }
    return false;
  }

  fromJSON(data: FlowGraphData): FlowGraph {
    this.editorData = data.editorData;
    this.nodes = [];
    let maxId = 0;
    for (const nodeData of data.nodes) {
      const node = this.addNode(nodeData);
      if (node.id > maxId) maxId = node.id;
    }
    this._nodeCount = maxId + 1;
    this._free = [];
    for (let i = 0; i < maxId; i++) {
      if (!this.nodes[i]) this._free.push(i);
    }

    for (const editorData of data.editorData.locations) {
      const node = this.getNode(editorData.id);
      if (!node) continue;
      node.x = editorData.x;
      node.y = editorData.y;
      node.isCollapsed = editorData.isCollapsed;
    }

    return this;
  }

  toJSON(): FlowGraphData {
    const editorData: FlowGraphEditorData = {
      x: this.editorData.x,
      y: this.editorData.y,
      zoom: this.editorData.zoom,
      locations: [],
    };
    const nodes: NodeData[] = [];
    for (let i = 0; i < this._nodeCount; i++) {
      const node = this.nodes[i];
      if (!node) continue;
      editorData.locations.push({
        id: node.id,
        x: node.x,
        y: node.y,
        isCollapsed: node.isCollapsed,
      });
      nodes.push(node.toJSON());
    }
    return {
      type: this.type,
      outputNodeId: this.outputNodeId,
      editorData,
      nodes,
    };
  }
}
