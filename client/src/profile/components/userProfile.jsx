import React from 'react'

const UserProfile = ({ todos, user }) => {
    return (
        <div>
            <h1>{user.username}</h1>
            <div>
                <h3>THEIR TODOS</h3>
                {todos.map(todo => (
                    <p>{todo.task}</p>
                ))}
            </div>
        </div>
    )
}

export default UserProfile