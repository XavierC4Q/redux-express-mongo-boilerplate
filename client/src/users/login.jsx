import React from 'react'
import { connect } from 'react-redux'
import actionCreators from './actionCreators'
import inputs from 'react-stateless-input'

const Login = ({ currentUser, login, history }) => {
    if (currentUser) {
        history.push('/')
    }
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                const { username, password } = inputs()
                login(username, password)
                history.push('/')
            }}>
                <div>
                    <h1>LOGIN PAGE</h1>
                    <input type='text' name='username' placeholder='ENTER NAME' />
                    <input type='text' name='password' placeholder='ENTER PASSWORD' />
                    <button type='submit'>SUBMIT</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUser
    }
}

const mapDispatchToProps = dispatch => ({
    login: (username, password) => {
        dispatch(actionCreators.loginUser(username, password))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)