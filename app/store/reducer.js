import { combineReducers } from 'redux'
import {reducer as authReducer} from '../util/auth/'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    AUTH: authReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
