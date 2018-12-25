import React from 'react';
import { NavItem , Glyphicon} from "react-bootstrap";
import 'whatwg-fetch';

export class Preview extends React.Component {
  constructor(props) {
    super(props);

    this.previewsetForm = this.preview.bind(this);
  }

  
  preview() {
    console.log('preview');
    fetch('/preview')
        .catch((ex) => {
            console.log('preview failed', ex);
        });
  }
  
  render() {
    return (
      <NavItem onClick={this.preview}><Glyphicon glyph="glyphicon-refresh" /> Preview</NavItem>
    );
  }
};

