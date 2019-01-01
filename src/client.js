require('bootstrap');

import React from "react";
import ReactDOM from "react-dom";
import { Grid, Row, Col, Well , Button} from "react-bootstrap";
import { Header } from "./header"
import { Block } from "./block.js";
import { Home } from "./home.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.forms = {};

    this.state = {
      activeBlock: '74HC4051',
    };

    this.setForm = this.setForm.bind(this);
    this.blockSelected = this.blockSelected.bind(this);
    this.onSave = this.onSave.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  setForm(id, form) {
    this.forms[id] = form;
  }

  blockSelected(block) {
    this.setState({ activeBlock: block });
    console.log(block);
  }

  onSave(event) {
    console.log("save", this.forms);
  }
  
  goHome()
  {
    this.setState({ activeBlock: null});
  }

  render() {
    return (
      <React.Fragment>
        <Header goHome={this.goHome} onSave={this.onSave} activeBlock={this.state.activeBlock}/>
        
        {
          (this.state.activeBlock == null) ? 
          <Home blockSelected = {this.blockSelected} /> : 
          <Block id="block" block={this.state.activeBlock} setForm={this.setForm} />
        }
        
      </React.Fragment>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById("app")
);
