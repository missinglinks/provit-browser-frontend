import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import './App.css'

import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import ConfigView from './config/container/ConfigView'
import HomeView from './home/container/HomeView'
import DirectoryView from './directory/container/DirectoryView'
import AgentListView from './agents/container/AgentListView'
import FileView from './file/container/FileView'

import Menu from './Menu'

class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <Typography component="h2" variant="display1">provit</Typography>
          </header>

          <Router>
            <div>

              <Menu />

            <Switch>
              <Route exact path="/" component={ HomeView } />
              <Route path="/config" component={ ConfigView } />
              <Route path="/directory" component={ DirectoryView } />
              <Route path="/agents" component={ AgentListView } />
              <Route path="/file" component={ FileView } />
            </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    )
  }
}

export default App
