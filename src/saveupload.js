import React from "react";
import { NavItem, Glyphicon } from "react-bootstrap";
import { invoke_upload } from "./controller.js";
import { toast } from 'react-toastify';

export function SaveUpload(props) {
  return (
    <NavItem onClick={event => {
    props.onSave();
    
    invoke_upload().then(response => {
      if (!response.ok)
      {
        console.log(response);
        toast.error('Upload failed:' + response.statusText);
      }
      else {
        toast.success("Upload successful");
      }
      });
      }
    }
      ><Glyphicon glyph="glyphicon-refresh" />Save & Upload</NavItem>
  );
}
