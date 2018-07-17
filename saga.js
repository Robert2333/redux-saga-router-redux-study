import { delay } from 'redux-saga'
import { put, takeEvery,all,call } from 'redux-saga/effects'

// ...

// Our worker Saga: 将执行异步的 increment 任务
export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action spawn 一个新的 incrementAsync 任务
export function* watchIncrementAsync() {
//   yield takeEvery('INCREMENT_ASYNC', incrementAsync)
//   yield takeEvery('INCREMENT_ASYNC', helloSaga)
// 同步执行
    yield [ takeEvery('INCREMENT_ASYNC', incrementAsync), takeEvery('INCREMENT_ASYNC', helloSaga)]
}

export function* helloSaga() {
    console.log('Hello Sagas!');
    return 'xjc';
  }

export default function* rootSaga() {
    yield all([
      watchIncrementAsync(),helloSaga(),
    ])
  }