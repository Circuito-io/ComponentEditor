import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { BlocksList } from "./blocks-list";

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.onBlockSelected = this.onBlockSelected.bind(this);
  }

  onBlockSelected(block) {
    this.props.history.push("/" + block);
  }

  render() {
    return (
      <Container style={{ maxWidth: "unset" }}>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h3>Edit or Create a Block</h3>
              </Card.Header>
              <Card.Body style={{ padding: "2rem 0.5rem" }}>
                <BlocksList
                  cachedData={this.props.cachedData}
                  onBlockSelected={this.onBlockSelected}
                  refreshData={this.props.refreshData}
                />
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <h3>How this works</h3>
              </Card.Header>
              <Card.Body>
                Welcome to the <a href="www.circuito.io" target="_blank">circuito.io</a> Component Editor!
                <ol>
                  <li>
                    Choose a block to <b>edit</b> or create a new one
                  </li>
                  <li>
                    Modify and <b>save</b> it
                  </li>
                  <li>
                    Click <b>'Preview'</b> to see it in a circuito sandbox
                  </li>
                  <li>
                    <b>Publish (pull-request)</b> your work so other can enjoy
                    it
                  </li>
                </ol>
                Need help? Visitr our{" "}
                <a
                  href="https://talk.circuito.io/c/component-editor"
                  target="_blank"
                >
                  support forum
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
