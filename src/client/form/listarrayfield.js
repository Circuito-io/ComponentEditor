import React from "react";
import {
  ListGroup,
  ListGroupItem,
  Button,
  Col,
  Row
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
//import "react-bootstrap-typeahead/css/Typeahead.css";

export function ListArrayField(props) {
  return (
    <div className={props.className}>
      <ListGroup>
        {props.items &&
          props.items.map(element => (
            <ListGroupItem key={props.idSchema + "-" + element.index}>
              <Row>
                <Col xs={8}>{element.children}</Col>
                <Col xs={2}>
                  <Button
                    variant="info"
                    //onClick={}
                  >
                    Edit
                  </Button>
                </Col>
                <Col xs={2}>
                  <Button
                    variant="danger"
                    onClick={element.onDropIndexClick(element.index)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </Button>
                </Col>
              </Row>
            </ListGroupItem>
          ))}

        {props.canAdd && (
          <ListGroupItem>
            <Row>
              <Col xs={10}>
                <Typeahead
                  options={["Res", "Cap"]}
                  placeholder="Add component..."
                />
              </Col>
              <Col xs={2}>
                <Button onClick={props.onAddClick}>+</Button>
              </Col>
            </Row>
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
}
