import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'

import Register from './auth/components/register'
import Login from './auth/components/login'
import Landing from './landing/components/landing'
import Profile from './profile/components/profile'

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
          <Route path='/profile/:username/add' component={Profile}/>
          <Route path='/profile/:username/todo/:id' component={Profile}/>
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
