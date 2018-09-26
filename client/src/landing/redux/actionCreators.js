import axios from 'axios'
import * as actions from './actions'

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

const getLoggedInUser = () => {
    return (dispatch) => {
        axios.get('/users/loggedIn').then((res) => {
            if(res.data.username){
                dispatch({ type: actions.LOGGED_IN_USER, user: res.data })
            }
        })
        .catch((error) => {
            dispatch({ type: actions.USER_ERROR, error: error })
        })
    }
}

export default {
    loadAllUsers,
    getLoggedInUser
}