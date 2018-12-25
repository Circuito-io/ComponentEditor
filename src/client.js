require('bootstrap');

import React from "react";
import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";
import { Header } from "./Header"
import { Block } from "./Block.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.forms = {};
    
    this.state = {
      activeBlock: null,
    };
    
    this.setForm = this.setForm.bind(this);
    this.blockSelected = this.blockSelected.bind(this);
  }

  setForm(id, form) {
    this.forms[id] = form;
  }
  
  blockSelected(block) {
    this.setState({activeBlock: block});
    console.log(block);
  }

  render() {
    return (
      <React.Fragment>
        <Header blockSelected={this.blockSelected} />
        
        <Block id="block" block={this.state.activeBlock} setForm={this.setForm} />

        <Button
          bsStyle="primary"
          onClick={e => {
            //forms.submit();
            console.log("save", this.forms);
          }}
        >
          Save
        </Button>
      </React.Fragment>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById("app")
);

