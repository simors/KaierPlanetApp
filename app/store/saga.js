/**
 * Created by yangyang on 2017/6/28.
 */
import { all } from 'redux-saga/effects'

import {saga as authSaga} from '../util/auth/'


export default function* rootSaga() {
  yield all([
    ...authSaga
  ])
}
