import React from "react";
import { Link } from "react-router-dom";
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

const UPDATE_CONNECTORS_TIMEOUT = 1000; // 1000 ms before calling updateConnectors on data change
export class Block extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formSrcData: {},
      partsList: [],
      codersList: [],
      blocksList: [],
      connectorsList: {},
      disabled: true
    };

    this.modified = false;
    this.currentData = {};
    this.cachedSVGData = {};
    this.updateCycle = 0;
    this.partConnectorsCache = {};
    this.updateConnectorsTimeout = null;

    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateConnectors = this.updateConnectors.bind(this);
    this.updatePartsInstanceName = this.updatePartsInstanceName.bind(this);
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

    if (!circuits) {
      if (this.state.disabled) this.setState({ disabled: false });

      return;
    }

    var connectorsByCircuit = {};
    circuits.forEach((circuit, index) => {
      connectorsByCircuit[index] = [];
    });

    // if multiple updates are called simulataniously, only use the lastest
    this.updateCycle += 1;
    var currentUpdateCycle = this.updateCycle;

    // collect port names
    circuits.forEach(
      (circuit, index) =>
        circuit.ports &&
        circuit.ports.forEach(port =>
          connectorsByCircuit[index].push(port.name)
        )
    );

    // collect pins: cache all parts, and update connectorsList
    var promises = [];
    var partsNames = new Set();

    circuits.forEach((circuit, circuitIndex) => {
      circuit.parts &&
        circuit.parts.forEach(part => {
          const partName = part.part;

          partName && partsNames.add(partName);
        });
    });

    // cache all parts
    partsNames.forEach(partName => {
      if (!(partName in this.partConnectorsCache)) {
        // part not in cache, retreive and cache for future use
        promises.push(
          read_a_part(partName)
            .then(partData => {
              if (currentUpdateCycle != this.updateCycle)
                return Promise.reject("Stale update cycle");

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
              if (ex != "Stale update cycle")
                console.log("Ignoring bad SVG", partName, ex);
            })
            .then(svgdata => {
              if (currentUpdateCycle != this.updateCycle)
                return Promise.reject("Stale update cycle");

              if (svgdata === undefined) return;

              this.partConnectorsCache[partName] = svgdata.ConnectorsNames;
            })
            .catch(ex => {
              if (ex != "Stale update cycle")
                console.log("Error with SVG", partName, ex);
            })
        );
      }
    });

    // when cache is ready, update connectorsList
    Promise.all(promises).then(() => {
      if (currentUpdateCycle == this.updateCycle) {
        circuits.forEach((circuit, circuitIndex) => {
          circuit.parts &&
            circuit.parts.forEach(part => {
              const partName = part.part;

              if (!partName) return;

              if (partName in this.partConnectorsCache) {
                // use part from cache
                connectorsByCircuit[circuitIndex].push(
                  ...this.partConnectorsCache[partName].map(
                    connector => `${part.name}.${connector}`
                  )
                );
              } else {
                console.warn(
                  "Part",
                  partName,
                  "expected in cache but not found"
                );
              }
            });
        });

        this.setState({ connectorsList: connectorsByCircuit, disabled: false });
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
    analytics.track("Block Saved", { name: this.props.block });
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
      analytics.track("Block Deleted", {
        name: this.props.block
      });
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

  updatePartsInstanceName(formData) {
    var circuits = formData.circuits && formData.circuits;

    if (!circuits) return formData;

    formData.circuits = formData.circuits.map(circuit => {
      var partsCounter = {};

      if (circuit.parts)
        circuit.parts = circuit.parts.map(part => {
          const partName = part.part;

          if (!partName) return part;

          if (!(partName in partsCounter)) partsCounter[partName] = 0;

          partsCounter[partName] += 1;

          part.name = `${partName}_${partsCounter[partName]}`;

          return part;
        });

      return circuit;
    });

    return formData;
  }

  onDataChange(form) {
    if (this.state.formSrcData == {}) return;

    var formData = form.formData;
    //detect changes in the circuits
    if (isEqual(formData.circuits, this.currentData.circuits) == false) {
      formData = this.updatePartsInstanceName(formData);

      this.setState({ formSrcData: formData });

      // don't update on every keypress, wait for a timeout before updating
      clearTimeout(this.updateConnectorsTimeout);
      this.updateConnectorsTimeout = setTimeout(
        this.updateConnectors,
        UPDATE_CONNECTORS_TIMEOUT
      );
    }

    ReactTooltip.rebuild();
    this.modified = true;
    this.currentData = formData;
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
        <div className="container" style={{ paddingBottom: "50px" }}>
          <EditorForm
            schema={blockSchema.default}
            uiSchema={blockuiSchema(
              this.props.cachedData.blocks,
              this.props.cachedData.controllers,
              supportBlocksList
            )}
            formData={this.state.formSrcData}
            formContext={{
              partsList: this.props.cachedData.parts,
              codersList: this.props.cachedData.coders,
              controllersList: this.props.cachedData.controllers,
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
              {this.state.disabled && <div className="lds-dual-ring" />}
              <Button
                onClick={event => {
                  gitpod_open("Blocks/" + this.props.block + ".json");
                }}
              >
                Open file in code editor
              </Button>
              <Button
                variant="danger"
                onClick={this.delete}
                disabled={this.state.disabled}
              >
                Delete
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={this.state.disabled}
              >
                Save
              </Button>
              <Link to="/">
                <Button>Close</Button>
              </Link>
            </div>
          </EditorForm>
        </div>
      </React.Fragment>
    );
  }
}
