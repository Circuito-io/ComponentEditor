import React from "react";
import { Button } from "react-bootstrap";
import { EditorForm } from "./form/editorform.js";
import { blockSchema, blockuiSchema } from "./schema/blockSchema.js";
import { gitpod_open, read_a_block, update_a_block, read_a_part, read_a_svgdata, list_all_coders, list_all_parts, list_all_blocks } from "./controller.js";

export class Block extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formSrcData: {},
      partsList: [],
      codersList: [],
      blocksList: []
    };

    this.modified = false;
    this.currentData = {};

    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateConnectors = this.updateConnectors.bind(this);
    this.save = this.save.bind(this);

    this.props.setSaveFunc(this.save);
  }

  componentDidMount() {
    if (this.props.match.params.block != null) {
      // update block
      var block = this.props.match.params.block;

      if (block == undefined) {
        this.setState({ formSrcData: {} });
        return
      }

      list_all_parts().then( parts =>
        {this.setState({partsList: parts})}
      );

      list_all_coders().then ( coders =>
        {this.setState({codersList: coders})}
      );

      list_all_blocks().then ( blocks =>
        {this.setState({blocksList: blocks})}
      );

      read_a_block(block)
        .then((blockData) => {
          this.setState({ formSrcData: blockData });

          this.updateConnectors()
        })
    }
  }

  updateConnectors() {
    var circuits = this.state.formSrcData.circuits && this.state.formSrcData.circuits;

    if (!circuits)
      return;

    const ports = circuits.map (circuit => circuit.ports && circuit.ports.map(port => port.name)).flat();

    this.setState({connectors: ports});

    var parts = circuits.map (circuit => {
      return circuit.parts && circuit.parts.map (part => {
        read_a_part(part.part).then(partData => {
          var symbolurl = partData.symbol && partData.symbol.URL;

          if (symbolurl)
            var imgid = symbolurl.split('/').pop()
          else {
            console.error("Mising symbol for", part.part);
            return;
          }

          read_a_svgdata(imgid).then(svgdata => {
            var normalizedConnectorsNames = svgdata.ConnectorsNames.map(connector => `${part.name}.${connector}`);
            console.log("Adding", normalizedConnectorsNames, "from circuit", circuit.name);
            // BUG: currently all connectors from all circuits are added to the same variable
            // But the react doesn't support different enums for different array elements (circuits)
            this.setState({connectors: this.state.connectors.concat(normalizedConnectorsNames) });
          })
        })
      })
    });
  }

  componentDidUpdate(prevProps) {
    var block = this.props.match.params.block;

    if (block == undefined) {
      this.setState({ formSrcData: {} });
      return
    }

    if (prevProps.match.params.block !== block) {
      read_a_block(block)
      .then((blockData) => {
        this.setState({ formSrcData: blockData });
      });
    }
  }

  save() {
    if (!(this.modified))
    {
      console.log("unmodified, ignoring save")
      return;
    }

    update_a_block(this.props.block, this.currentData)
      .then((json) => {
        console.log("Update response:", json);
        this.modified = false;
      })
  }

  render() {
    return (
      <React.Fragment>
          <Button onClick={(event) => {
              gitpod_open('Blocks/' + this.props.block + '.json');
          }}>
              Open file in code editor
          </Button>
          <EditorForm
          schema={blockSchema(this.state.connectors)}
          uiSchema={blockuiSchema(this.state.blocksList)}
          formData={this.state.formSrcData}
          formContext={{
              partsList: this.state.partsList,
              codersList: this.state.codersList
          }}
          onChange={data => {
              this.modified=true;
              this.currentData = data.formData;
          }}
          >
          <Button type="submit" style={{ display: "none" }}>
              Submit
          </Button>
          </EditorForm>
      </React.Fragment>
    );
  }
}
