import React from "react";
import { NavItem, Glyphicon } from "react-bootstrap";
import { toast } from 'react-toastify';

export function Publish(props) {
  return (
    <NavItem onClick={event => {
      toast.info('Use gitpod git interface to fork, commit and create a pull request' , {autoClose: false});
    }}
      >Publish</NavItem>
  );
}
