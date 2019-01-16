import React from 'react';
import { NavItem, Glyphicon } from "react-bootstrap";
import 'whatwg-fetch';

export class Preview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {previewURL: ''};
    
    this.getPreviewURL = this.getPreviewURL.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.getPreviewURL();
  }

  getPreviewURL() {
    fetch('/api/preview')
      .then(res => {
        res.text().then(data => { 
          this.setState({previewURL: data});
          });
      })
      .catch((ex) => {
        console.log('getPreviewURL failed', ex);
      });
  }

  render() {
    return (
      <NavItem href={this.state.previewURL} target="_blank"><Glyphicon glyph="glyphicon-refresh" /> Preview</NavItem>
    );
  }
};
