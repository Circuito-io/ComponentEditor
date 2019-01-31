import React from "react";
import { Grid, Row, Col, Well, Image } from "react-bootstrap";
import { BlocksList } from "./blocks-list";
import { NewComponent } from "./newcomponent";

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
      <Grid>
        <Row>
          <Col>
            <Well>
              <h2>Edit or create a block</h2>
              <br />
              <BlocksList
                cachedData={this.props.cachedData}
                onBlockSelected={this.onBlockSelected}
                refreshData={this.props.refreshData}
              />
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }
}
