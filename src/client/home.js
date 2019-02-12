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
            <Card body>
              <h2>Edit or create a block</h2>
              <br />
              <BlocksList
                cachedData={this.props.cachedData}
                onBlockSelected={this.onBlockSelected}
                refreshData={this.props.refreshData}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
