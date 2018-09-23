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
        case 'REMOVE_TODO':
            return {
                userTodos: [...state.userTodos.slice(0,state.userTodos.length - 1)]
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