import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import actionCreators from './actionCreators'

class Landing extends React.Component {

    componentDidMount() {
        this.props.getAllUsers()
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)