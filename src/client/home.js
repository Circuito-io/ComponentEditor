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
      <Container>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
