import { combineReducers } from 'redux'
import {reducer as authReducer} from '../util/auth/'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    AUTH: authReducer,
    ...asyncReducers
  })
}

export default makeRootReducer
