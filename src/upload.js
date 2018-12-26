import React from 'react';
import { NavItem , Glyphicon} from "react-bootstrap";
import 'whatwg-fetch';

export class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.upload = this.upload.bind(this);
  }

  
  upload() {
    console.log('upload');
    fetch('/upload')
        .catch((ex) => {
            console.log('upload failed', ex);
        });
  }
  
  render() {
    return (
      <NavItem onClick={this.upload}><Glyphicon glyph="glyphicon-refresh" /> Upload</NavItem>
    );
  }
};

