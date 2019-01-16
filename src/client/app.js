require('bootstrap');

import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from 'react-toastify';
import { Header } from "./header"
import { Block } from "./block.js";
import { Home } from "./home.js";

import './form.css';
import 'react-toastify/dist/ReactToastify.css';

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
  }

  blockSelected(block) {
    this.setState({ activeBlock: block });
    console.log(block);
  }

  onSave() {
    if (this.state.activeBlock != null)
      this.blockSaveFunc();
  }

  setSave(savefunc) {
    this.blockSaveFunc = savefunc;
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
          <Block id="block" block={this.state.activeBlock} setSave={this.setSave}/>
        }

        <ToastContainer
          hideProgressBar={true}
        />

      </React.Fragment>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById("app")
);
