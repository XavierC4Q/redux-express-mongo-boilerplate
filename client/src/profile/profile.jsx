import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import actionCreators from './actionCreators'

import LoggedInProfile from './loggedInProfile'
import UserProfile from './userProfile'

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
            removeTodo,
            logout
        } = this.props
        return (
            <div>
                {
                    pageOwner ? 
                        currentUser ? 
                            currentUser.username === pageOwner.username ? <LoggedInProfile user={currentUser} todos={todos} addTodo={addTodo} removeTodo={removeTodo} logout={logout} /> 
                                : <UserProfile user={pageOwner} todos={todos} /> 
                                    : <UserProfile user={pageOwner} todos={todos} /> 
                                        : <div>loading page</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
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
    removeTodo: (id) => {
        dispatch(actionCreators.removeTodo(id))
    },
    logout: () => {
        dispatch(actionCreators.logoutUser())
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))