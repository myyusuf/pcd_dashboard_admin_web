import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import 'antd/dist/antd.css';

import './App.css';

import Workspace from './components/workspace/Workspace';

class App extends Component {
  render() {
    let componentToRender = (
      <Workspace>
      </Workspace>
    );

    return (
      <div className="App">
        <Router>
          {componentToRender}
        </Router>
      </div>
    );
  }
}

export default App;
