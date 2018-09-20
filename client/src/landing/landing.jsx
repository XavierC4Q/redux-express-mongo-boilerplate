import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import actionCreators from './actionCreators'

class Landing extends React.PureComponent {

    componentDidMount() {
        this.props.getAllUsers()
    }
    
    render() {
        console.log(this.props)
        return (
            <div>
                {
                    this.props.currentUser ? '' : <nav>
                        <Link to='/register'>REGISTER</Link>
                        {' '}
                        <Link to='/login'>LOGIN</Link>
                    </nav>
                }
                <h1>HOME PAGE</h1>
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