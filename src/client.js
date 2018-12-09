var $ = require('jquery');
window.$ = $;
require('bootstrap');

import React from "react";
import ReactDOM from "react-dom";
import MyForm from "./myform";
import PartsList from "./partslist";
import Header from "./header";

const title = "My  React Webpack Babel Setup";

ReactDOM.render(
  <div>
    <Header />
  
    <div>
      <PartsList />
      <br />
      <MyForm />
    </div>
  </div>,
  document.getElementById("app")
);

module.hot.accept();
