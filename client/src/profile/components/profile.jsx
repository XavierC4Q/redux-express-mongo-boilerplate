import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import actionCreators from '../redux/actionCreators'

import AddTodo from './addTodo'
import Home from './home'
import Todo from '../../utils/todo'

class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            task: ''
        }
    }

    componentDidMount() {
        this.props.getPageOwner(this.props.username)
        this.props.getUserTodos(this.props.username)
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const {
            currentUser,
            pageOwner,
            todos,
            addTodo,
            updateTodo,
            removeTodo,
            logout
        } = this.props
        return (
           <div>
               <Switch>
                   <Route exact path='/profile/:username/add' render={(props) => {
                       const { username } = props.match.params
                       return(<AddTodo user={currentUser} username={username} addTodo={addTodo}/>)
                   }}/>
                   <Route exact path='/profile/:username/todo/:id' render={(props) => {
                       const { username, id } = props.match.params
                       let findTodo = todos.find(t => t._id === id)
                       return (<Todo todo={findTodo} updateTodo={updateTodo} removeTodo={removeTodo} user={currentUser}/>)
                   }}/>
                   <Route path='/profile/:username' render={() => {
                       return <Home user={currentUser} logout={logout} todos={todos}/>
                   }}/>
               </Switch>
           </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('THE STATE OF THINGS', state)
    return {
        currentUser: state.users.currentUser,
        pageOwner: state.users.pageOwner,
        todos: state.todos.userTodos
    }
}

const mapDispatchToProps = dispatch => ({
    getPageOwner: (username) => {
        dispatch(actionCreators.getUser(username))
    },
    getUserTodos: (username) => {
        dispatch(actionCreators.getUserTodos(username))
    },
    addTodo: (username, task) => {
        dispatch(actionCreators.addTodo(username, task))
    },
    updateTodo: (id) => {
        dispatch(actionCreators.updateTodo(id))
    },
    removeTodo: (id) => {
        dispatch(actionCreators.removeTodo(id))
    },
    logout: () => {
        dispatch(actionCreators.logoutUser())
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))