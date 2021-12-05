import { createStore,applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga.js';
const sagaMiddleware = createSagaMiddleware()

const defaultState = { 
    token: JSON.parse(localStorage.getItem("token")) || {},
    posts:[]
}

const reducer = (state = defaultState, action)=>{
    switch(action.type){    
        case "SET_USER":
            return {...state, token: localStorage.setItem('token',JSON.stringify(action.payload))};
        case 'SET_POSTS':
            return {...state, posts: [...state.posts, ...action.payload]}
        case "CLEAR_USER":
            return {...state, token: state.token = ''}
        default:
          return state
      }
}

let store = createStore(reducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export default store;