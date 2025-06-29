import { NodeData, NodeInputData, NodeOutputData } from "./FlowNode.types";
import { FlowGraph } from "../Graph/FlowGraph";
import { FlowNodeInput } from "./FlowNodeInput";
import { FlowNodeOutput } from "./FlowNodeOutput";

export class FlowNode {
  id = 0;
  type = "";
  name = "";
  meta: any = {};
  x = 0;
  y = 0;
  isCollapsed: boolean;
  properties: Record<string, any>;
  inputs: FlowNodeInput[] = [];
  outputs: FlowNodeOutput[] = [];

  private inputMap = new Map<string, FlowNodeInput>();
  private outputMap = new Map<string, FlowNodeOutput>();

  constructor(public graph: FlowGraph, data: NodeData) {
    this.fromJSON(data);
  }

  fromJSON(data: NodeData): FlowNode {
    this.id = data.id;
    this.type = data.type;
    this.name = data.name;
    this.meta = data.meta;
    this.properties = data.properties;
    this.inputs = [];
    for (const inputData of data.inputs) {
      this.addInput(inputData);
    }
    this.outputs = [];
    for (const outputData of data.outputs) {
      this.addOutput(outputData);
    }
    return this;
  }

  getInput(id: string): FlowNodeInput | null {
    const input = this.inputMap.get(id);
    if (!input) return null;
    return input;
  }

  removeInput(name: string): boolean {
    for (let i = 0; i < this.inputs.length; i++) {
      const input = this.inputs[i];
      if (input.name == name) {
        this.inputs.splice(i);
        this.inputMap.delete(input.name);
        return true;
      }
    }
    return false;
  }

  addInput(data: NodeInputData): FlowNodeInput {
    const socket = new FlowNodeInput(this, data);
    this.inputs.push(socket);
    this.inputMap.set(socket.name, socket);
    return socket;
  }

  getOutput(name: string): FlowNodeOutput | null {
    const output = this.outputMap.get(name);
    if (!output) return null;
    return output;
  }

  removeOutput(name: string): boolean {
    for (let i = 0; i < this.outputs.length; i++) {
      const output = this.outputs[i];
      if (output.name == name) {
        this.outputs.splice(i);
        this.outputMap.delete(output.name);
        return true;
      }
    }
    return false;
  }

  addOutput(data: NodeOutputData): FlowNodeOutput {
    const output = new FlowNodeOutput(this, data);
    this.outputs.push(output);
    this.outputMap.set(output.name, output);
    return output;
  }

  toJSON(): NodeData {
    const inputs: NodeInputData[] = [];
    for (let i = 0; i < this.inputs.length; i++) {
      inputs.push(this.inputs[i].toJSON());
    }
    const outputs: NodeOutputData[] = [];
    for (let i = 0; i < this.inputs.length; i++) {
      outputs.push(this.outputs[i].toJSON());
    }
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      meta: this.meta,
      properties: this.properties,
      inputs,
      outputs,
    };
  }
}
