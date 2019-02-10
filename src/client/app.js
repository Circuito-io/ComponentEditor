const jQuery = require("jquery");
window.jQuery = jQuery;

import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header } from "./header";
import { Block } from "./block.js";
import { Home } from "./home.js";
import { cacheData } from "./controller.js";
import ReactTooltip from "react-tooltip";

import "./form.css";
import "react-toastify/dist/ReactToastify.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeBlock: null,
      cachedData: { blocks: [], parts: [], coders: [], blocksData: [] }
    };

    this.refreshData = this.refreshData.bind(this);

    this.refreshData();
  }

  refreshData() {
    cacheData().then(cachedData => {
      this.setState({ cachedData });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route exact path="/" render={props => <Header {...props} />} />
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                cachedData={this.state.cachedData}
                refreshData={this.refreshData}
              />
            )}
          />

          <Route
            path="/:block"
            render={props => (
              <Header {...props} activeBlock={props.match.params.block} />
            )}
          />
          <Route
            path="/:block"
            render={props => (
              <Block
                {...props}
                id="block"
                cachedData={this.state.cachedData}
                block={props.match.params.block}
              />
            )}
          />
          <ToastContainer hideProgressBar={true} />
          <ReactTooltip
            html={true}
            delayHide={1000}
            className="form-tooltip"
            effect="solid"
            place="right" 
          />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
