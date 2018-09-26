import React from 'react'
import { Redirect } from 'react-router-dom'

const Todo = ({ user, removeTodo, updateTodo, todo }) => {
    if(!user){
        return(<Redirect to='/'/>)
    }

    if(!todo){
        let profilePath = `/profile/${user.username}`
        return(<Redirect to={profilePath}/>)
    }

    return(
        <div>
            <h2>{todo.task.toUpperCase()}</h2>
            {todo.complete ? '' : <button onClick={() => updateTodo(todo._id)}>UPDATE TODO</button>}
            <button onClick={() => removeTodo(todo._id)}>REMOVE THIS TODO</button>
        </div>
    )
}

export default Todo