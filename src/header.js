import React from 'react';
import ReactDOM from 'react-dom';
import Preview from './preview';


export default class Header extends React.Component {
  render() {
    return (
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">Editor</a>
            </div>
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#">Page 1</a></li>
            </ul>
            
            <ul class="nav navbar-nav navbar-right">
              <li><Preview /></li>
            </ul>
          </div>
        </nav>
    );
  }
}
