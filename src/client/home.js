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
    this.props.history.push('/'+block);
    console.log(block);
  }

  render() {
    return (
      <Grid>
          <Row>
            <Col sm={6}>
              <Well>
                <h2>Edit</h2>
                <br/>
                <BlocksList cachedData={this.props.cachedData} onBlockSelected = {this.onBlockSelected}/>
              </Well>
            </Col>
            <Col sm={6}>
              <Well>
                <h2>Create</h2>
                <br/>
                <NewComponent/>
              </Well>
            </Col>
          </Row>
        </Grid>
    );
  }
}
