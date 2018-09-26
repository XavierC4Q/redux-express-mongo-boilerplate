import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import actionCreators from '../redux/actionCreators'

class Landing extends React.Component {

    componentDidMount() {
        this.props.getAllUsers()
        this.props.getLoggedInUser()
    }
    
    render() {
        let profilepath = this.props.currentUser ? `/profile/${this.props.currentUser.username}` : null
        return (
            <div>
                <h1>HOME PAGE</h1>
                {
                    this.props.currentUser ? <nav>
                        <Link to={profilepath}>PROFILE</Link>
                    </nav> : <nav>
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
    getLoggedInUser: () => {
        dispatch(actionCreators.getLoggedInUser())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)