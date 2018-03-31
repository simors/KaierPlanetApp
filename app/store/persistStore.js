/**
 * Created by yangyang on 2017/6/28.
 */
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import {createLogger} from 'redux-logger'
import makeRootReducer from './reducer'
import rootSaga from './saga'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: []
}

const persistedReducer = persistReducer(persistConfig, makeRootReducer())

const logger = createLogger({predicate: (getState, action) => __DEV__})
const sagaMiddleware = createSagaMiddleware()

const createStore = (initialState = {}) => {
  const store = createReduxStore(persistedReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware, logger)
    ))
  sagaMiddleware.run(rootSaga)
  store.close = () => store.dispatch(END)
  return store
}

export const store = createStore()
export const persistor = persistStore(store, null, () => {
  console.log("after rehydration")
})