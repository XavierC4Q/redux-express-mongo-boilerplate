import {combineReducers} from 'redux'
import users from './userreducer'
import todos from './todosreducer'


export default combineReducers({ users, todos })