import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import 'antd/dist/antd.css';

import './App.css';

import Workspace from './components/workspace/Workspace';
import UserList from './components/user/UserList';
import RoleList from './components/user/RoleList';
import ProjectList from './components/project/ProjectList';
import ProjectProgressList from './components/project/ProjectProgressList';
import PiutangList from './components/project/PiutangList';
import ProjectionList from './components/finance/ProjectionList';
import CashFlowList from './components/finance/CashFlowList';

class App extends Component {
  render() {
    let componentToRender = (
      <Workspace>
        <Route path="/users" component={UserList} />
        <Route path="/roles" component={RoleList} />
        <Route path="/projects" component={ProjectList} />
        <Route path="/projectprogresses" component={ProjectProgressList} />
        <Route path="/piutangs" component={PiutangList} />
        <Route path="/projections" component={ProjectionList} />
        <Route path="/cashflows" component={CashFlowList} />
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
