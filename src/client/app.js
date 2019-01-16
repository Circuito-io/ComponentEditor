require('bootstrap');

import React from "react";
import ReactDOM from "react-dom";
import { Route, IndexRoute, BrowserRouter } from 'react-router-dom';
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

    cacheData()
    .then((cachedData)=> {
      this.setState({cachedData});
    })
  }

  onSave() {
    if (this.blockSaveFunc) {
      this.blockSaveFunc();
    }
  }

  setSaveFunc(savefunc) {
    this.blockSaveFunc = savefunc;
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route exact path='/' render={(props)=> 
            <Header {...props} onSave={this.onSave}/>}
          />
          <Route exact path='/' render={(props)=>
            <Home {...props} cachedData={this.state.cachedData} />
          }/>
          
          <Route path='/:block' render={(props)=> 
            <Header {...props} activeBlock={props.match.params.block} onSave={this.onSave}/>}
          />
          <Route path='/:block' render={(props)=>
            <Block {...props} id="block" setSaveFunc={this.setSaveFunc}
                    cachedData={this.state.cachedData} block={props.match.params.block}/>
          }/>
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
