import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import AddTodo from './utils/addTodo'

class LoggedInProfile extends React.Component {

    render(){
        const { user, todos, logout, addTodo, removeTodo } = this.props
        console.log(this.props)
        return(
            <div>
                <nav>
                    <Link to='/profile/add'>Add Todo</Link>
                </nav>
                <button onClick={() => logout()}>LOGOUT</button>
                <Switch>
                    <Route exact path='/profile/add' render={() => {
                        return(<AddTodo addTodo={addTodo} username={user.username}/>)
                    }}/>
                    <Route path='/profile/:username' render={() => {
                        return(<div><h1>THE LOGGED IN PROFILE PAGE</h1></div>)
                    }}/>
                </Switch>
            </div>
        )
    }
}

export default LoggedInProfile