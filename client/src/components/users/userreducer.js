export default (state = {
    currentUser: null,
    allUsers: [],
    message: ''
}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                currentUser: action.user,
                allUsers: [...state.allUsers, action.user]
            }
        case 'REGISTER':
            return {
                currentUser: action.user,
                allUsers: [...state.allUsers, action.user]
            }
        case 'ALL_USERS':
            return {
                ...state,
                allUsers: [action.users]
            }
        case 'LOGOUT':
            return {
                currentUser: null,
                allUsers: [...state.allUsers]
            }
        case 'ERROR':
            return {
                message: new Error(`Your error is ${action.error.message}`)
            }
        default:
            return state
    }
}