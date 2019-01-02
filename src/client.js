require('bootstrap');

import React from "react";
import ReactDOM from "react-dom";
import { Header } from "./header"
import { Block } from "./block.js";
import { Home } from "./home.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.blockSaveFunc = null;

    this.state = {
      activeBlock: null
    };

    this.blockSelected = this.blockSelected.bind(this);
    this.onSave = this.onSave.bind(this);
    this.setSave = this.setSave.bind(this);
    this.goHome = this.goHome.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  blockSelected(block) {
    this.setState({ activeBlock: block });
    console.log(block);
  }

  onSave(event) {
    this.blockSaveFunc();
  }

  setSave(savefunc) {
    this.blockSaveFunc = savefunc;
  }

  updateData(data) {
    this.currentData = data;
  }

  goHome() {
    this.setState({ activeBlock: null });
  }

  render() {
    return (
      <React.Fragment>
        <Header goHome={this.goHome} onSave={this.onSave} activeBlock={this.state.activeBlock}/>
        
        {
          (this.state.activeBlock == null) ? 
          <Home blockSelected = {this.blockSelected} /> : 
          <Block id="block" block={this.state.activeBlock} setSave={this.setSave} updateData={this.updateData}/>
        }
        
      </React.Fragment>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById("app")
);
