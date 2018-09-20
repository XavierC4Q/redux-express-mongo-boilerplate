import React from 'react'
import {connect} from 'react-redux'
import registerUser from './actionCreators'
import inputs from 'react-stateless-input'


const Register = ({ currentUser, registerUser, history }) => {
    console.log(registerUser)
    if(currentUser){
        history.push('/');
    }
    return(
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                const { username, password } = inputs();
                registerUser(username, password);
                history.push('/')
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

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (username, password) => dispatch(registerUser(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);