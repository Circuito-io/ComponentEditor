import React from "react";
import { Form } from "react-bootstrap";

export function WireDropDown(props) {
  const contextid = props.id;

  const circuitid = contextid.split("_")[2]; // like root_circuits_1_wires_2_from => 1
  const connectorsList = props.formContext.connectorsList;

  return (
    <Form.Group>
      <Form.Control
        as="select"
        value={props.value}
        required={props.required}
        onChange={event => props.onChange(event.target.value)}
      >
        <option value="" />
        {connectorsList &&
          connectorsList[circuitid] &&
          connectorsList[circuitid].map((connector, index) => (
            <option key={connector} value={connector}>
              {connector.indexOf(".") < 0 ? `${connector} (port)` : `${connector} (pin)`}
            </option>
          ))}
      </Form.Control>
    </Form.Group>
  );
}
