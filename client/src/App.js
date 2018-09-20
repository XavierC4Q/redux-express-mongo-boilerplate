import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import Register from './users/register'
import Login from './users/login'
import Landing from './landing/landing'

class App extends Component {
  render() {
    console.log('HOME PAGE PROPS',this.props)
    return (
      <div>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route  exact path='/register' component={Register}/>
          <Route  path='/' component={Landing}/>}/>
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

export default connect(mapStateToProps)(App);
