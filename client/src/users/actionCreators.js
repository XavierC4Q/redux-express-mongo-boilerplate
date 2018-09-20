import * as actions from './actions'
import axios from 'axios'

const loginUser = (username, password) => {
    return (dispatch) => {
        try {
            axios.post('/users/login', {
                username: username,
                password: password
            })
            .then((res) => {
                dispatch({ type: actions.LOGIN, user: res.data })
            })
        }
        catch(error){
            dispatch({ type: actions.USER_ERROR, error: error })
        }
    }
}

const registerUser = (username, password) => {
    return (dispatch) => {
        try {
            axios.post('/users/register', {
                username: username,
                password: password
            })
            .then((res) => {
                dispatch({ type: actions.REGISTER, user: res.data })
            })
        }
        catch(error){
            dispatch({ type: actions.USER_ERROR, error: error })
        }
    }
}

const loadAllUsers = () => {
    return (dispatch) => {
        axios.get('/users').then((res) => {
            dispatch({ type: actions.ALL_USERS, users: res.data })
        })
        .catch(error => {
            dispatch({ type: actions.USER_ERROR, error: error })
        })
    }
}

const logoutUser = () => {
    return (dispatch) => {
        axios.get('/users/logout').then(() => {
            dispatch({ type: actions.LOGOUT })
        })
        .catch(error => {
            dispatch({ type: actions.USER_ERROR, error: error })
        })
    }
}

export default  {
    loginUser,
    registerUser,
    loadAllUsers,
    logoutUser
}