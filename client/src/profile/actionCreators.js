import axios from 'axios'
import * as actions from './actions'

const getUser = (username) => {
    return (dispatch) => {
        axios.get(`/users/find/${username}`).then((res) => {
            dispatch({ type: actions.GET_USER, user: res.data })
        })
        .catch((error) => {
            dispatch({ type: actions.USER_ERROR, error: error })
        })
    }
}

const logoutUser = () => {
    return (dispatch) => {
        axios.get('/users/logout').then(() => {
                dispatch({
                    type: actions.LOGOUT
                })
            })
            .catch(error => {
                dispatch({
                    type: actions.USER_ERROR,
                    error: error
                })
            })
    }
}

const getUserTodos = (username) => {
    return (dispatch) => {
        axios.get(`/todos/find/${username}`).then((res) => {
            dispatch({ type: actions.GET_USER_TODOS, todos: res.data })
        }).catch((error) => {
            dispatch({ type: actions.ERROR_TODOS, error: error })
        })
    }
}

const addTodo = (username, task) => {
    return (dispatch) => {
        axios.post('/todos/add', {
            username: username,
            task: task
        })
        .then((res) => {
            dispatch({ type: actions.ADD_USER_TODOS, todo: res.data })
        })
        .catch((error) => {
            dispatch({ type: actions.ERROR_TODOS, error: error })
        })
    }
}

const removeTodo = (id) => {
    return (dispatch) => {
        axios.delete(`/todos/delete/${id}`).then(() => {
            dispatch({ type: actions.REMOVE_TODO })
        })
        .catch((error) => {
            dispatch({ type: actions.ERROR_TODOS, error: error })
        })
    }
}

export default {
    getUser,
    getUserTodos,
    addTodo,
    removeTodo,
    logoutUser
}