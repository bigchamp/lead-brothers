import React, {Component} from 'react';
import {connect} from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Weather} from './containers'
import {Header } from './components'

import './App.css';
import { Spin } from 'antd';

class App extends Component {
  componentDidUpdate(prevProps) {
    const {rehydrated} = this.props

    if(rehydrated !== prevProps.rehydrated && rehydrated) {

    }
  }
  render() {
    const {rehydrated} = this.props
    return (
      !rehydrated
      ? <Spin /> 
      : <Router>
          <div>
            <Header />
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/contacts">
                <Contacts />
              </Route>
              <Route path="/">
                <Weather />
              </Route>
            </Switch>
          </div>
        </Router>
    );
  }
}

function About() {
  return <h2>О проекте</h2>;
}

function Contacts() {
  return <h2>Контакты</h2>;
}

const mapStateToProps = (state) => ({
  rehydrated: state._persist.rehydrated
})

export default connect(mapStateToProps)(App)

