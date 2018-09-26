export default (state = {
    userTodos: [],
    message: ''
}, action) => {
    switch (action.type) {
        case 'GET_USER_TODOS':
            return {
                userTodos: action.todos
            }
        case 'ADD_USER_TODOS':
            return {
                userTodos: [...state.userTodos].concat([action.todo])
            }
        case 'UPDATE_TODO':
            let updated = []
            state.userTodos.forEach(todo => {
                if(todo._id === action.todoID){
                    todo.complete = true
                    updated.push(todo)
                }
                else {
                    updated.push(todo)
                }
            })
            return {
                ...state,
                userTodos: updated
            }
        case 'REMOVE_TODO':
            let removedTodo = []
            state.userTodos.forEach(todo => {
                if(todo._id !== action.todoID){
                    removedTodo.push(todo)
                }
            })
            return {
                ...state,
                userTodos: removedTodo
            }
        case 'ERROR_TODOS':
            return {
                userTodos: [...state.userTodos, action.todo],
                message: new Error(`FAULT ADDING TODO ${action.error.message}`)
            }
        default:
            return state
    }
}