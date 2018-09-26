export default (state = {
    currentUser: null,
    pageOwner: null,
    allUsers: [],
    message: ''
}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                currentUser: action.user,
                allUsers: [...state.allUsers, action.user]
            }
        case 'REGISTER':
            return {
                ...state,
                currentUser: action.user,
                allUsers: [...state.allUsers, action.user]
            }
        case 'LOGGED_IN_USER':
            return {
                ...state,
                currentUser: action.user
            }
        case 'ALL_USERS':
            return {
                ...state,
                allUsers: [action.users]
            }
        case 'GET_USER':
            return {
                ...state,
                pageOwner: action.user
            }
        case 'LOGOUT':
            return {
                ...state,
                currentUser: null,
                allUsers: [...state.allUsers]
            }
        case 'USER_ERROR':
            return {
                ...state,
                message: new Error(`Your error is ${action.error.message}`)
            }
        default:
            return state
    }
}