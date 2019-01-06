import React from "react";
import { Panel, PanelGroup, Button } from "react-bootstrap";
import { EditorForm } from "./form/editorform.js";
import { blockSchema, blockuiSchema } from "./schema/blockSchema.js";
import { circuitsSchema, circuitsuiSchema } from "./schema/circuitSchema.js";
import { read_a_block, update_a_block } from "./controller.js";

export class Block extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formSrcData: {},
    };

    this.modified = false;
    this.currentData = {};

    this.componentDidMount = this.componentDidMount.bind(this);
    this.save = this.save.bind(this);

    this.props.setSave(this.save);
  }

  componentDidMount() {
    console.log('block update');
    if (this.props.block != null) {
      // update block
      var block = this.props.block
      console.log("Update form", block);

      if (block == undefined) {
        this.setState({ formSrcData: {} });
        return
      }

      read_a_block(block)
        .then((blockData) => {
          console.log("setting", blockData);
          this.setState({ formSrcData: blockData });
        })
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
                schema={blockSchema}
                uiSchema={blockuiSchema}
                formData={this.state.formSrcData}
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
