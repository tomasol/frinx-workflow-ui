import { NodeModel } from "storm-react-diagrams";
import { ForkNodePortModel } from "./ForkNodePortModel";
import * as _ from "lodash";
import { DefaultPortModel } from "storm-react-diagrams";
import { DiagramEngine } from "storm-react-diagrams";

export class ForkNodeModel extends NodeModel {
  name: string;
  color: string;
  ports: { [s: string]: DefaultPortModel };
  inputs: {};

  constructor(
    name: string = "Untitled",
    color: string = "rgb(0,192,255)",
    inputs: {}
  ) {
    super("fork");
    this.name = name;
    this.color = color;
    super.extras = { inputs: inputs };

    this.addPort(new ForkNodePortModel(true, "left"));
    this.addPort(new ForkNodePortModel(false, "right"));
  }

  deSerialize(object, engine: DiagramEngine) {
    super.deSerialize(object, engine);
    this.name = object.name;
    this.color = object.color;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color
    });
  }

  getInputs() {
    return this.inputs;
  }
}
