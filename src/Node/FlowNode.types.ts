export interface NodeEditorData {
  id: number;
  x: number;
  y: number;
  isCollapsed: boolean;
}

export interface NodeData {
  id: number;
  type: string;
  name: string;
  inputs: NodeInputData[];
  outputs: NodeOutputData[];
  meta: any;
  properties: Record<string, any>;
}

export interface NodeIOBaseData {
  name: string;
  valueType: string;
  value: any;
}

export interface NodeInputData extends NodeIOBaseData {
  inputName?: string;
  /**The id of node the input is connected to */
  targetNodeId?: number;
  /**The name of the output the input is connected to */
  targetOutputName?: string;
}

export interface NodeOutputData extends NodeIOBaseData {
  outputName?: string;
}
