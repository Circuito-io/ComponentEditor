require('bootstrap');

import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header } from "./header"
import { Block } from "./block.js";
import { Home } from "./home.js";
import {cacheData} from './controller.js';

import './form.css';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.blockSaveFunc = null;

    this.state = {
      activeBlock: null,
      cachedData: {blocks: [], parts: [], coders: []},
    };

    this.onSave = this.onSave.bind(this);
    this.setSaveFunc = this.setSaveFunc.bind(this);
    this.goHome = this.goHome.bind(this);
    this.updateData = this.updateData.bind(this);

    cacheData()
    .then((cachedData)=> {
      this.setState({cachedData});
    })
  }

  onSave(event) {
    if (this.activeBlock)
      this.blockSaveFunc();
  }

  setSaveFunc(savefunc) {
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
      <BrowserRouter>
        <React.Fragment>
          <Header goHome={this.goHome} onSave={this.onSave} activeBlock={this.state.activeBlock} />
          <Route exact path='/' render={(props)=>
            <Home {...props} cachedData={this.state.cachedData} />}
          />
          <Route path='/:block' render={(props)=> 
            <Block {...props} id="block" setSaveFunc={this.setSaveFunc} 
                              updateData={this.updateData}/>}
          />
          
          <ToastContainer 
            hideProgressBar={true}
          />
          
        </React.Fragment>
      </BrowserRouter>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById("app")
);
