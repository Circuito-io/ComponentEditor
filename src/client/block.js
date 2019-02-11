import React from "react";
import { isEqual } from "underscore";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { EditorForm } from "./form/editorform.js";
import { blockuiSchema } from "./schema/blockSchema.js";
import {
  gitpod_open,
  read_a_block,
  update_a_block,
  read_a_part,
  read_a_svgdata,
  delete_a_block
} from "./controller.js";
import ReactTooltip from "react-tooltip";

import * as blockSchema from "../../circuito-schema/block.json";
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
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    if (!this.props.block) {
      this.setState({ formSrcData: {} });
      return;
    }

    read_a_block(this.props.block).then(blockData => {
      this.setState({ formSrcData: blockData });
      ReactTooltip.rebuild();
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
                  var symbolurl = partData.symbol;

                  if (symbolurl && typeof symbolurl === "string")
                    var imgid = symbolurl
                      .split("/")
                      .slice(4)
                      .join("/");
                  else {
                    return Promise.reject("Mising symbol for " + partName);
                  }

                  return imgid;
                })
                .then(read_a_svgdata)
                .catch(ex => {
                  console.log("Ignoring bad SVG", part.part);
                })
                .then(svgdata => {
                  if (svgdata === undefined) return;

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

    update_a_block(this.props.block, this.currentData).then(res => {
      if (!(res && res.ok))
        toast.error(
          "Update block failed:" + ((res && res.statusText) || "can't connect")
        );
      else toast.success("Saved " + this.props.block, { autoClose: 2000 });
      this.modified = false;
    });
  }

  delete() {
    if (confirm("Really delete block?")) {
      delete_a_block(this.props.block).then(res => {
        if (!(res && res.ok)) toast.error("Delete block failed");
        else {
          toast.success("Deleted " + this.props.block, { autoClose: 2000 });
          this.setState({ block: null });
          this.props.history.push("/");
        }
      });
    }
  }

  onDataChange(data) {
    if (this.state.formSrcData == {}) return;

    if (isEqual(data.formData.circuits, this.currentData.circuits) == false) {
      this.setState({ formSrcData: data.formData });
      this.updateConnectors();
      ReactTooltip.rebuild();
    }

    this.modified = true;
    this.currentData = data.formData;
  }

  render() {
    var supportBlocksList = this.props.cachedData.blocksData.reduce(
      (res, block) => {
        if (
          block.category &&
          (block.category.indexOf("support") >= 0 ||
            block.category.indexOf("power") >= 0 ||
            block.category.indexOf("powerConnector") >= 0)
        ) {
          res.push(block.name);
        }
        return res;
      },
      []
    );

    return (
      <React.Fragment>
        <div className="container">
          <Button
            onClick={event => {
              gitpod_open("Blocks/" + this.props.block + ".json");
            }}
          >
            Open file in code editor
          </Button>
          <EditorForm
            schema={blockSchema.default}
            uiSchema={blockuiSchema(
              this.props.cachedData.blocks,
              supportBlocksList
            )}
            formData={this.state.formSrcData}
            formContext={{
              partsList: this.props.cachedData.parts,
              codersList: this.props.cachedData.coders,
              connectorsList: this.state.connectorsList
            }}
            onChange={this.onDataChange}
            onSubmit={this.save}
            onError={errors => {
              toast.error(
                "Validation errors: " +
                  errors.map(error => error.stack).join(",")
              );
            }}
          >
            <div className="fixed-bottom-footer modal-footer">
              <Button bsStyle="danger" onClick={this.delete}>
                Delete
              </Button>
              <Button bsStyle="primary" type="submit">
                Save
              </Button>
            </div>
          </EditorForm>
        </div>
      </React.Fragment>
    );
  }
}
