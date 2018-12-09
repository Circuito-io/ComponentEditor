import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

var preview = function(evt) {
  console.log(evt);
  fetch('/preview')
        .catch((ex) => {
            console.log('preview failed', ex);
        });
}

export default class Preview extends React.Component {
  render() {
    return (
        <a href="#" onClick={preview}><span class="glyphicon glyphicon-refresh"></span> Preview</a>
    );
  }
}
