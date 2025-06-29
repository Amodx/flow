import { FlowNode } from "./FlowNode";
import { NodeOutputData } from "./FlowNode.types";

export class FlowNodeOutput {
  name: string;
  valueType: string;
  value: number;
  ioType: "output" = "output";
  outputName?: string;
  constructor(public node: FlowNode, data: NodeOutputData) {
    this.fromJSON(data);
  }

  fromJSON(data: NodeOutputData) {
    this.name = data.name;
    this.valueType = data.valueType;
    this.value = data.value;
    if (data.outputName) this.outputName = data.outputName;
  }
  toJSON(): NodeOutputData {
    return {
      name: this.name,
      valueType: this.valueType,
      value: this.value,
      outputName: this.outputName,
    };
  }
}
