import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import {Provider as ReduxProvider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import allReducers from './rootReducer'
import thunk from 'redux-thunk'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const config = () => {
    return createStore(
        allReducers,
        {},
        applyMiddleware(thunk)
    )
}

const store = config()
console.log(allReducers)
ReactDOM.render(
<ReduxProvider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</ReduxProvider>, document.getElementById('root'));
registerServiceWorker();
