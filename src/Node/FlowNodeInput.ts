import { FlowNode } from "./FlowNode";
import { NodeInputData } from "./FlowNode.types";

export class FlowNodeInput {
  name: string;
  valueType: string;
  value: any;
  ioType: "input" = "input";
  inputName?: string;
  targetNodeId?: number;
  targetOutputName?: string;

  constructor(public node: FlowNode, data: NodeInputData) {
    this.fromJSON(data);
  }

  setTarget(targetNodeId: number, targetOutputName: string) {
    this.targetNodeId = targetNodeId;
    this.targetOutputName = targetOutputName;
  }

  clearTarget() {
    this.targetNodeId = undefined;
    this.targetOutputName = undefined;
  }

  fromJSON(data: NodeInputData) {
    this.name = data.name;
    this.valueType = data.valueType;
    this.value = data.value;
    if (data.inputName !== undefined) this.inputName = data.inputName;
    if (data.targetNodeId !== undefined) this.targetNodeId = data.targetNodeId;
    if (data.targetOutputName !== undefined)
      this.targetOutputName = data.targetOutputName;
  }
  toJSON() {
    return {
      name: this.name,
      valueType: this.valueType,
      value: this.value,
      ...(this.inputName !== undefined ? { inputName: this.inputName } : {}),
      ...(this.targetNodeId !== undefined
        ? { targetNodeId: this.targetNodeId }
        : {}),
      ...(this.targetOutputName !== undefined
        ? { targetOutputName: this.targetOutputName }
        : {}),
    };
  }
}
