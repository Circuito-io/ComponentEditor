import React from "react";
import { FormGroup, FormControl } from "react-bootstrap";

export function WireDropDown(props) {
  const contextid = props.id;

  const circuitid = contextid.split('_')[2]; // like root_circuits_1_wires_2_from => 1
  const connectorsList = props.formContext.connectorsList;

  return (
    <FormGroup>
      <FormControl
        componentClass="select"
        value={props.value}
        required={props.required}
        onChange={event => props.onChange(event.target.value)}
      >
        <option value=""></option>
        {connectorsList && connectorsList[circuitid] && connectorsList[circuitid].map(connector => (<option value={connector}>{connector}</option>))}
      </FormControl>
    </FormGroup>
  );
}