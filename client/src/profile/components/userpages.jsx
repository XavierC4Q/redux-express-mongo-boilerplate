import React from 'react'

import Home from './home'
import UserProfile from './userProfile'

const UserPage = ({ user, pageOwner, todos, logout }) => {
    return (
        <div>
        {
            pageOwner ?
                currentUser ?
                    currentUser.username === pageOwner.username ? <Home user={currentUser} todos={todos} logout={logout} />
                        : <UserProfile user={pageOwner} todos={todos} />
                    : <UserProfile user={pageOwner} todos={todos} />
                : <div>loading page</div>
        }
    </div>
    )
}

export default UserPage