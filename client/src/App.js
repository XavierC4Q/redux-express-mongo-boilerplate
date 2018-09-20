import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Register from './users/register'
import Login from './users/login'
import Landing from './landing/landing'

class App extends Component {
  render() {
    console.log('HOME PAGE PROPS',this.props)
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Landing}/>}/>
          <Route exact path='/login' render={() => (
            this.props.currentUser ? (<Redirect to='/'/>) : (<Login/>)
          )}/>
          <Route exact path='/register' render={() => (
            this.props.currentUser ? (<Redirect to='/'/>) : (<Register/>)
          )}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser
  }
}

export default withRouter(connect(mapStateToProps)(App));
