import React from "react";
import { Panel, PanelGroup, Tabs, Tab, Button } from "react-bootstrap";
import Form from "react-jsonschema-form";
import { TypeaheadField } from "react-jsonschema-form-extras/lib/TypeaheadField";
import RTEField from "react-jsonschema-form-extras/lib/RTEField";
import urlJoin from 'proper-url-join';
import { Circuit } from "./circuit.js";
import { blockSchema, blockuiSchema } from "./blockSchema.js";


export class Block extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      formSrcData : {},
    };
    
    this.updateFormRef = this.updateFormRef.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  updateFormRef(form) {
    this.props.setForm(this.props.id, form);
  }
  
  componentDidUpdate(prevProps) {
     if (prevProps.block != this.props.block)
     {
       // update block
       var block = this.props.block
       console.log("Update form", block);
       
       if (block == undefined)
       {
         this.setState({formSrcData: {}});
         return
       }
       
       fetch(urlJoin('/blocks/' + block))
        .then((response) => response.json())
        .then((blockData) => {
            console.log("Got", blockData);
            this.setState({formSrcData: blockData});
        })
        .catch((ex) => {
            console.log('parsing failed', ex);
        })
       
     }
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
              <Form
                schema={blockSchema}
                uiSchema={blockuiSchema}
                fields={{ rte: RTEField, typeahead: TypeaheadField }}
                ref={this.updateFormRef}
                formData={this.state.formSrcData}
              >
                <Button type="submit" style={{ display: "none" }}>
                  Submit
                </Button>
              </Form>
            </Panel.Body>
          </Panel>
          <Panel eventKey="2">
            <Panel.Heading>
              <Panel.Title toggle>Circuits</Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              <Tabs defaultActiveKey={1} id="circuits-tabs">
                <Tab eventKey={1} title="Circuit1">
                  <Circuit
                    id="circuit1"
                    handleChange={this.props.handleChange}
                    setForm={this.props.setForm}
                  />
                </Tab>
                <Tab eventKey={2} title="Circuit2">
                  <Circuit
                    id="circuit2"
                    handleChange={this.props.handleChange}
                    setForm={this.props.setForm}
                  />
                </Tab>
                <Tab eventKey={3} title="Create New..." />
              </Tabs>
            </Panel.Body>
          </Panel>
        </PanelGroup>
      </div>
    );
  }
}
