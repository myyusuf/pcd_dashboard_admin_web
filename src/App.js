import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import 'antd/dist/antd.css';

import './App.css';

import Workspace from './components/workspace/Workspace';
import UserList from './components/user/UserList';
import RoleList from './components/user/RoleList';


class App extends Component {
  render() {
    let componentToRender = (
      <Workspace>
        <Route path="/users" component={UserList} />
        <Route path="/roles" component={RoleList} />
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
