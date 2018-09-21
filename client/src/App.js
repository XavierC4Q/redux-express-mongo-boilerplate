import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Register from './auth/register'
import Login from './auth/login'
import Landing from './landing/landing'
import Profile from './profile/profile'

class App extends Component {
  render() {
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
          <Route exact path='/profile/:username' render={(props) =>{
            const { username } = props.match.params
            return(<Profile username={username}/>)
          }}/>
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
