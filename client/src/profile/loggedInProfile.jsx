import React from 'react'

class LoggedInProfile extends React.Component {
    constructor(){
        super()
        this.state = {
            task: ''
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    submitTodo = () => {
        if(this.state.task){
            this.props.addTodo(this.props.user.username,this.state.task)
            this.setState({ task: '' })
        }
    }

    render(){
        const { user, todos, logout, removeTodo } = this.props
        console.log(todos)
        return(
            <div>
                <h1>WELCOME BACK {user.username}</h1>
                <div>
                    <h3>ADD TODO</h3>
                    <input type='text' name='task' value={this.state.task} onInput={this.handleInput} placeholder='Put todo here'/>
                    <button onClick={this.submitTodo}>SUBMIT</button>
                </div>
                <div>
                    <h3>YOUR TODOS</h3>
                    {todos.map(todo => (
                        <p>{todo.task}</p>
                    ))}
                </div>
                <button onClick={() => logout()}>LOGOUT</button>
            </div>
        )
    }
}

export default LoggedInProfile