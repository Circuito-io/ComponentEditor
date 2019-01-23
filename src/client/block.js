import React from "react";
import { isEqual } from "underscore";
import { Button } from "react-bootstrap";
import { EditorForm } from "./form/editorform.js";
import { blockuiSchema } from "./schema/blockSchema.js";
import {
  gitpod_open,
  read_a_block,
  update_a_block,
  read_a_part,
  read_a_svgdata
} from "./controller.js";

import * as blockSchema from '../../circuito-schema/block.json';
export class Block extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formSrcData: {},
      partsList: [],
      codersList: [],
      blocksList: [],
      connectorsList: {}
    };

    this.modified = false;
    this.currentData = {};
    this.cachedSVGData = {};
    this.updateCycle = 0;
    this.partConnectorsCache = {};

    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateConnectors = this.updateConnectors.bind(this);
    this.save = this.save.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.props.setSaveFunc(this.save);
  }

  componentDidMount() {
    if (!this.props.block) {
      this.setState({ formSrcData: {} });
      return;
    }

    read_a_block(this.props.block).then(blockData => {
      this.setState({ formSrcData: blockData });

      this.updateConnectors();
    });
  }

  updateConnectors() {
    var circuits =
      this.state.formSrcData.circuits && this.state.formSrcData.circuits;

    if (!circuits) return;

    var connectorsByCircuit = {};
    circuits.forEach((circuit, index) => {
      connectorsByCircuit[index] = [];
    });

    // if multiple updates are called simulataniously, one use the last one
    this.updateCycle += 1;
    var currentUpdateCycle = this.updateCycle;

    circuits.forEach(
      (circuit, index) =>
        circuit.ports &&
        circuit.ports.forEach(port =>
          connectorsByCircuit[index].push(port.name)
        )
    );

    var promises = [];

    circuits.forEach((circuit, circuitIndex) => {
      circuit.parts &&
        circuit.parts.forEach(part => {
          const partName = part.part;

          if (partName in this.partConnectorsCache) {
            // use part from cache
            connectorsByCircuit[circuitIndex].push(
              ...this.partConnectorsCache[partName]
            );
          } else {
            // part no in cache, retreive and cache for future use
            promises.push(
              read_a_part(part.part)
                .then(partData => {
                  var symbolurl = partData.symbol && partData.symbol.URL;

                  if (symbolurl) var imgid = symbolurl.split("/").pop();
                  else {
                    return Promise.reject("Mising symbol for " + partName);
                  }

                  return imgid;
                })
                .then(read_a_svgdata)
                .then(svgdata => {
                  const svgConnectors = svgdata.ConnectorsNames.map(
                    connector => `${part.name}.${connector}`
                  );

                  this.partConnectorsCache[partName] = svgConnectors;
                  connectorsByCircuit[circuitIndex].push(...svgConnectors);
                })
            );
          }
        });
    });

    Promise.all(promises).then(() => {
      if (currentUpdateCycle == this.updateCycle) {
        this.setState({ connectorsList: connectorsByCircuit });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (!this.props.block) {
      this.setState({ formSrcData: {} });
      return;
    }

    if (prevProps.block !== this.props.block) {
      read_a_block(this.props.block).then(blockData => {
        this.setState({ formSrcData: blockData });
      });
    }
  }

  save() {
    if (!this.modified) {
      console.log("unmodified, ignoring save");
      return;
    }

    update_a_block(this.props.block, this.currentData).then(json => {
      console.log("Update response:", json);
      this.modified = false;
    });
  }

  onDataChange(data) {
    if (this.state.formSrcData == {}) return;

    if (isEqual(data.formData.circuits, this.currentData.circuits) == false) {
      this.setState({ formSrcData: data.formData });
      this.updateConnectors();
    }

    this.modified = true;
    this.currentData = data.formData;
  }

  render() {
    return (
      <React.Fragment>
        <Button
          onClick={event => {
            gitpod_open("Blocks/" + this.props.block + ".json");
          }}
        >
          Open file in code editor
        </Button>
        <EditorForm
          schema={blockSchema.default}
          uiSchema={blockuiSchema(this.props.cachedData.blocks)}
          formData={this.state.formSrcData}
          formContext={{
            partsList: this.props.cachedData.parts,
            codersList: this.props.cachedData.coders,
            connectorsList: this.state.connectorsList
          }}
          onChange={this.onDataChange}
        >
          <Button type="submit" style={{ display: "none" }}>
            Submit
          </Button>
        </EditorForm>
      </React.Fragment>
    );
  }
}
