/**
 * Created by yangyang on 2017/6/28.
 */
import { all } from 'redux-saga/effects'

import {authSaga} from '../util/auth/'


export default function* rootSaga() {
  yield all([
    ...authSaga
  ])
}
