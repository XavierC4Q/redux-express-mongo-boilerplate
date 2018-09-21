import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import inputs from 'react-stateless-input'
import actionCreators from './actionCreators'

//<button onClick={() => {this.props.logout()}}>LOGOUT</button>

class Profile extends React.Component {

    componentDidMount() {
        this.props.getUserTodos(this.props.username)
        this.props.getPageOwner(this.props.username)
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
                <h1>{pageOwner ? pageOwner.username : 'loading name'}</h1>
                <div>
                    <h3>YOUR TODOS</h3>
                    <ul>
                        {
                            todos.map(todo => (
                                <li>{todo.task}</li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    {
                        pageOwner ? 
                            currentUser ?
                                currentUser.username === pageOwner.username ? 
                                    <button onClick={logout}>LOGOUT</button> : ''
                                        : ''
                                            : ''
                    }
                </div>
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