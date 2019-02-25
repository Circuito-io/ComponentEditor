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
          </Col>
        </Row>
      </Container>
    );
  }
}
