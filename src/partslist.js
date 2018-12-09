import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

export default class PartsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parts: [],
    };
    
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
      fetch('/parts')
        .then((response) => response.json())
        .then((json) => {
            console.log('parsed json', json);
            const parts = json;
            this.setState({ parts });
        })
        .catch((ex) => {
            console.log('parsing failed', ex);
        })
  };

  render() {
    return (
      <div class="container">
        <h2>Parts</h2>
        <br />
        <ul>
          {this.state.parts.map(part =>
            <li key={part}>{part}</li>
          )}
        </ul>
      </div>
    );
  }
}
