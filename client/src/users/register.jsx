import React from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import actionCreators from './actionCreators'
import inputs from 'react-stateless-input'

const Register = ({ currentUser, register }) => {
    if(currentUser){
        return (<Redirect to='/'/>)
    }
    return(
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                const { username, password } = inputs();
                register(username, password);
            }}>
            <div>
                <h1>REGISTER PAGE</h1>
                <input type='text' name='username' placeholder='ENTER YOUR USERNAME'/>
                <input type='text' name='password' placeholder='ENTER YOUR PASSWORD'/>
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
};

const mapDispatchToProps = dispatch => ({
    register: (username, password) => {
        dispatch(actionCreators.registerUser(username, password))
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));