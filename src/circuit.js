import React from "react";
import { Well, Tab, Row, Col, Nav, NavItem, Button } from "react-bootstrap";
import { EditorForm } from "./editorform.js"
import { Part } from "./part.js";
import { Coder } from "./coder.js";
import { ListArrayField } from "./listarrayfield.js";

import {
  circuitInfoSchema,
  circuitInfouiSchema,
  circuitPartsSchema,
  circuitPartuiSchema,
  circuitBlocksSchema,
  circuitBlocksuiSchema,
  circuitWiringSchema,
  circuitCodersSchema
} from "./circuitSchema.js";

export class Circuit extends React.Component {
  constructor(props) {
    super(props);
    this.updateFormRefGen = this.updateFormRefGen.bind(this);
  }

  updateFormRefGen(id) {
    return form => {
      this.props.setForm(this.props.id + "." + id, form);
    };
  }

  render() {
    return (
      <Well>
        <Tab.Container id="circuit-tabs" defaultActiveKey="info">
          <Row className="clearfix">
            <Col sm={2}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="info">Info</NavItem>
                <NavItem eventKey="parts">Parts</NavItem>
                <NavItem eventKey="blocks">Support Blocks</NavItem>
                <NavItem eventKey="coders">Coders</NavItem>
                <NavItem eventKey="wiring">Wiring</NavItem>
              </Nav>
            </Col>
            <Col sm={10}>
              <Well>
                <Tab.Content animation>
                  <Tab.Pane eventKey="info">
                    <EditorForm
                      schema={circuitInfoSchema}
                      uiSchema={circuitInfouiSchema}
                      ref={this.updateFormRefGen("info")}
                    />
                    <Button> Delete this circuit </Button>
                  </Tab.Pane>
                  <Tab.Pane eventKey="parts">
                    <EditorForm
                      schema={circuitPartsSchema}
                      uiSchema={circuitPartuiSchema}
                      formData={{ partlist: ["RES10k", "Cap10uF"] }}
                      ArrayFieldTemplate={ListArrayField}
                      ref={this.updateFormRefGen("parts")}
                    />
                    <Part />
                  </Tab.Pane>
                  <Tab.Pane eventKey="blocks">
                    <EditorForm
                      schema={circuitBlocksSchema}
                      uiSchema={circuitBlocksuiSchema}
                      ref={this.updateFormRefGen("blocks")}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="coders">
                    <EditorForm
                      schema={circuitCodersSchema}
                      ref={this.updateFormRefGen("coders")}
                    />
                    <Coder />
                  </Tab.Pane>
                  <Tab.Pane eventKey="wiring">
                    <EditorForm
                      schema={circuitWiringSchema}
                      ref={this.updateFormRefGen("wiring")}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Well>
            </Col>
          </Row>
        </Tab.Container>
      </Well>
    );
  }
}
