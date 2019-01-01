import React from 'react';
import ReactDOM from 'react-dom';
import { Typeahead } from "react-bootstrap-typeahead";
import { list_all_blocks } from "./controller.js";

//import "react-bootstrap-typeahead/css/Typeahead.css";
//import "react-bootstrap-typeahead/css/Typeahead-bs4.css";

export class BlocksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    list_all_blocks()
      .then((blocks) => {
        this.setState({ blocks });
      })
  };

  render() {
    return (
      <Typeahead
        options={this.state.blocks}
        onChange={(selected) => {this.props.blockSelected(selected[0]);}}
        bsSize={"small"}
        placeholder="Choose a block to edit"
        //defaultSelected = {["DT-22"]}
      />
    );
  }
}
