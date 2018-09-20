import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Route, Switch, Link} from 'react-router-dom'
import Register from './users/register'

const Home = () => {
  return(
    <div>you are a false god and a worse liar
      <Link to='/register'>Create your account</Link>
    </div>
  )
}

class App extends Component {
  render() {
    console.log('HOME PAGE PROPS',this.props)
    return (
      <div>
        <Switch>
        <Route  exact='exact' path='/register' component={Register}/>
          <Route  path='/' component={Home}/>}/>
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
