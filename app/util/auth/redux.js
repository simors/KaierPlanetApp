import {call, put, takeLatest} from 'redux-saga/effects';
import {createAction} from 'redux-actions';
import {Record, Map, Set, List} from 'immutable'
import * as api from './cloud';

// --- model

class AuthState extends Record({
  test: undefined
}, 'AuthState') {

}

class User extends Record({
  id: undefined,                  // objectId
  nickname: undefined             // nickname
}, 'User') {
  static fromJson(json) {
    const imm = new User();

    return imm.withMutations((m) => {
      m.set('id', json.id);
      m.set('nickname', json.nickname);
    });
  }

  static toJson(imm) {
    // NOTE: IE8 does not support property access. Only use get() when supporting IE8
    return {
      id: imm.id,
      nickname: imm.nickname
    };
  }
}


// --- constant

const TEST_ACTION = 'TEST_ACTION';
const TEST_FIN = 'TEST_FIN';
const REQ_SMS_CODE = 'REQ_SMS_CODE'
const LOGIN_WITH_PHONE = 'LOGIN_WITH_PHONE'


// --- action

export const action = {
  testAction: createAction(TEST_ACTION),
  loginWithPhoneNumber: createAction(LOGIN_WITH_PHONE),
  requestSmsCode: createAction(REQ_SMS_CODE)
};

const testFin = createAction(TEST_FIN);

// --- saga

export const saga = [
  takeLatest(TEST_ACTION, sagaTestSaga),
  takeLatest(LOGIN_WITH_PHONE, sagaLoginWithPhoneNumber),
  takeLatest(REQ_SMS_CODE, sagaRequestSmsCode)
];

/**
 *
 * @param action
 * payload = {
 *   phone,
 *   password,
 *   onSuccess?,
 *   onFailure?,
 *   onComplete?,
 * }
 */
function* sagaTestSaga(action) {
  const payload = action.payload;

  try {
    let params = {}
    const data = yield call(api.testLY, params);

    yield put(testFin({data}));

    if (payload.onSuccess) {
      payload.onSuccess();
    }
  } catch (e) {
    console.error(e)
    if (payload.onFailure) {
      payload.onFailure(e);
    }
  }
}

function* sagaLoginWithPhoneNumber(action) {
  let payload = action.payload
  
  try {
    let userInfo = yield call(api.loginWithPhoneNumber, payload)
    console.log("userInfo", userInfo)
    
    if (payload.success) {
      payload.success()
    }
  } catch (e) {
    console.error(e)
    if (payload.error) {
      payload.error()
    }
  }
}

function* sagaRequestSmsCode(action) {
  let payload = action.payload
  
  try {
    yield call(api.sendPhoneSmsCode, payload)
    
    if (payload.success) {
      payload.success()
    }
  } catch (e) {
    if (payload.error) {
      payload.error()
    }
  }
}

// --- reducer

const initialState = new AuthState();

export function reducer(state=initialState, action) {
  switch(action.type) {
    case TEST_FIN:
      return reduceTest(state, action);
    default:
      return state
  }
}

function reduceTest(state, action) {
  state = state.set('test', action.payload.data)
  return state
}


// --- selector

export const selector = {
  selectCurUser,
};

function selectCurUser(appState) {
  const curUserId = appState.AUTH.curUserId;
  if (curUserId === undefined)
    return undefined;

  return selectUserById(appState, curUserId);
}

