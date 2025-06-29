import { FlowNode } from "./FlowNode";
import { NodeInputData } from "./FlowNode.types";

export class FlowNodeInput {
  name: string;
  valueType: string;
  value: number;
  ioType: "input" = "input";
  inputName?: string;
  targetNodeId?: number;
  targetOutputName?: string;

  constructor(public node: FlowNode, data: NodeInputData) {
    this.fromJSON(data);
  }

  fromJSON(data: NodeInputData) {
    this.name = data.name;
    this.valueType = data.valueType;
    this.value = data.value;
    if (data.inputName) this.inputName = data.inputName;
    if (data.targetNodeId) this.targetNodeId = data.targetNodeId;
    if (data.targetOutputName) this.inputName = data.targetOutputName;
  }
  toJSON() {
    return {
      name: this.name,
      valueType: this.valueType,
      value: this.value,
      ...(this.inputName ? { inputName: this.inputName } : {}),
      ...(this.targetNodeId ? { targetNodeId: this.targetNodeId } : {}),
      ...(this.targetOutputName
        ? { targetOutputName: this.targetOutputName }
        : {}),
    };
  }
}
