import React from "react";
import { Grid, Row, Col, Well, Button, Image } from "react-bootstrap";
import { BlocksList } from "./blocks-list";
import { NewComponent } from "./newcomponent";

export class Home extends React.Component {
  render() {
    return (
      <Grid>
          <Row>
            <Col xs={6}>
              <Well>
                <h2>Edit</h2>
                <br/>
                <BlocksList blockSelected = {this.props.blockSelected}/>
              </Well>
            </Col>
            <Col xs={6}>
              <Well>
                <h2>Create</h2>
                <br/>
                <NewComponent/>
              </Well>
            </Col>
          </Row>
          
          <Row>
            <Col xs={12}>
              <Well>
                <h1>Getting Started</h1>
                These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.  
                <br/>
                <br/>
                <Image src="https://res.cloudinary.com/circuito/image/upload/v1545819424/Circuito_4_Entities.png" responsive />
                <br/>
                <br/>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/9YffrCViTVk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </Well>
            </Col>
          </Row>
        </Grid>
    );
  }
}
