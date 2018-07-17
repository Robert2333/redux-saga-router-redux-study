import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware,combineReducers} from 'redux'
import Counter from './Counter'
import reducer from './reducers'

import createSagaMiddleware from 'redux-saga'
import rootSaga, {helloSaga} from './saga'

//redux-router@next 写法
import createHistory from "history/createBrowserHistory";
import { Route } from "react-router";

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from "react-router-redux";
//获取一个history
const history = createHistory();
//中间层
const middleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware(rootSaga)

const store = createStore(
  combineReducers({
    xujunchao:reducer,
    router: routerReducer
  }),
  applyMiddleware(middleware,sagaMiddleware)
);
//const store = createStore(reducer, applyMiddleware(sagaMiddleware))
function test() {
  const state = store.getState();
  if (state.xujunchao === 5) {
    console.log("+1s")
    store.dispatch(push('/foo'))
  }

}

sagaMiddleware.run(rootSaga)
const action = type => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
    value={store.getState()}
    onIncrement={() => action('INCREMENT')}
    onDecrement={() => action('DECREMENT')}
    onIncrementAsync={() => store.dispatch({type: 'INCREMENT_ASYNC'})}/>, document.getElementById('root'))
}

render()
store.subscribe(render)
store.subscribe(test);
