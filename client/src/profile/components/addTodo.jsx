import React from 'react'
import { Redirect } from 'react-router-dom'

class AddTodo extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            newTask: '',
            allTask: []
        }
    }

    handleKeyPress = (e) => {
        const { newTask, allTask } = this.state
        if (e.key === 'Enter') {
            if (newTask) {
                let addNewTask = newTask
                this.setState({
                    newTask: '',
                    allTask: [...allTask, addNewTask]
                })
            }
        }
        else if(e.key.match(/^[a-zA-Z0-9_.-\s]*$/)){
            this.setState({ newTask: newTask + e.key })
        }
    }

    handleAddTodo = (e) => {
        e.preventDefault()
        const { newTask, allTask } = this.state
        const { addTodo, username } = this.props

        if(newTask && !allTask.length){
            addTodo(username, newTask)
            this.setState({
                newTask: '',
                allTask: []
            })
            return(<Redirect to='/'/>)
        }
        else if(allTask.length){
            allTask.forEach(t => {
                addTodo(username, t)
            })
            this.setState({
                newTask: '',
                allTask: []
            })
            return(<Redirect to='/'/>)
        }
    }

    render() {
        const { newTask, allTask } = this.state
        return (
            <div>
                <h1>ADD TODOS HERE</h1>
                <div>
                    <p>YOU CAN QUEUE MULTIPLE TODOS BY HITTING ENTER AND THEN SUBMITTING</p>
                </div>
                <input type='text' value={newTask} name='newTask' onKeyPress={this.handleKeyPress}/>
                <div>
                    <h3>TODO Q</h3>
                    {allTask.map(t => (
                        <p>{t}</p>
                    ))}
                </div>
                <button onClick={this.handleAddTodo}>SUBMIT NEW TODOS</button>
            </div>
        )
    }
}

export default AddTodo