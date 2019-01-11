import React from "react";
import { Panel, PanelGroup, Button } from "react-bootstrap";
import { EditorForm } from "./form/editorform.js";
import { blockSchema, blockuiSchema } from "./schema/blockSchema.js";
import { read_a_block, update_a_block, read_a_part, read_a_svgdata, list_all_coders, list_all_parts, list_all_blocks } from "./controller.js";

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

    this.props.setSave(this.save);
  }

  componentDidMount() {
    if (this.props.block != null) {
      // update block
      var block = this.props.block

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
    this.setState({connectors: []});

    var circuits = this.state.formSrcData.circuits && this.state.formSrcData.circuits;

    if (!circuits)
      return;

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
        }) })
    });
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
      <div>
        <PanelGroup accordion id="block-panels" defaultActiveKey="1">
          <Panel eventKey="1">
            <Panel.Heading>
              <Panel.Title toggle>Block Info</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
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
                  this.props.updateData(data);
                }}
              >
                <Button type="submit" style={{ display: "none" }}>
                  Submit
                </Button>
              </EditorForm>
            </Panel.Body>
          </Panel>
          <Panel eventKey="2">
            <Panel.Heading>
              <Panel.Title toggle>Circuits</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
            </Panel.Body>
          </Panel> 
        </PanelGroup>
      </div>
    );
  }
}
