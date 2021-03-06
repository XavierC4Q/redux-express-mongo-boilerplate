import * as actions from './actions'
import axios from 'axios'


const loginUser = (username, password) => {
    return (dispatch) => {
        axios.post('/users/login', {
                username: username,
                password: password
            })
            .then((res) => {
                if(res.data){
                    dispatch({
                        type: actions.LOGIN,
                        user: res.data
                    })
                }
                else {
                    dispatch({
                        type: actions.USER_ERROR,
                        error: 'FALSE PASSWORD/USERNAME'
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: actions.USER_ERROR,
                    error: error
                })
            })
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
                    dispatch({
                        type: actions.REGISTER,
                        user: res.data
                    })
                })
        } catch (error) {
            dispatch({
                type: actions.USER_ERROR,
                error: error
            })
        }
    }
}

export default {
    loginUser,
    registerUser
}