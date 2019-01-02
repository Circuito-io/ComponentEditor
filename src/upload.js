import React from "react";
import { NavItem, Glyphicon } from "react-bootstrap";
import { invoke_upload } from "./controller.js";
import { toast } from 'react-toastify';

export function Upload() {
  return (
    <NavItem onClick={event => invoke_upload().then(response => {
      if (!response.ok)
      {
        console.log(response);
        toast.error('Upload failed:' + response.statusText);
      }
      else {
        toast.success("Upload successful");
      }
      })}><Glyphicon glyph="glyphicon-refresh" /> Upload</NavItem>
  );
}
