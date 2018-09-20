import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import actionCreators from './actionCreators'

class Landing extends React.Component {

    componentDidMount() {
        this.props.getAllUsers()
    }
    
    render() {
        return (
            <div>
                <h1>HOME PAGE</h1>
                {
                    this.props.currentUser ? <button onClick={() => {this.props.logout()}}>LOGOUT</button> : <nav>
                        <Link to='/register'>REGISTER</Link>
                        {' '}
                        <Link to='/login'>LOGIN</Link>
                    </nav>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allUsers: state.users.allUsers,
        currentUser: state.users.currentUser
    }
}

const mapDispatchToProps = dispatch => ({
    getAllUsers: () => {
        dispatch(actionCreators.loadAllUsers())
    },
    logout: () => {
        dispatch(actionCreators.logoutUser())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)