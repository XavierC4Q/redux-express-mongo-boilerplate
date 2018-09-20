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

export default {
    loadAllUsers,
    logoutUser
}