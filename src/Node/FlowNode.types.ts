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
  value: number;
}



export interface NodeInputData extends NodeIOBaseData {
  inputName?: string;
  targetNodeId?: number;
  targetOutputName?: string;
}

export interface NodeOutputData extends NodeIOBaseData {
  outputName?: string;
}

