import React from 'react';
import { Typeahead } from "react-bootstrap-typeahead";
import { list_all_blocks } from "./controller.js";
//import "react-bootstrap-typeahead/css/Typeahead.css";
//import "react-bootstrap-typeahead/css/Typeahead-bs4.css";

export class BlocksList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Typeahead
        options={this.props.cachedData.blocks}
        onChange={(selected) => {
          if (this.props.cachedData.blocks.includes(selected[0])) {
            this.props.onBlockSelected(selected[0]);
          }
        }}
        bsSize={"small"}
        placeholder="Choose a block to edit"
        //defaultSelected = {["DT-22"]}
      />
    );
  }
}
