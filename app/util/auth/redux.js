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


// --- action

export const action = {
  testAction: createAction(TEST_ACTION),
};

const testFin = createAction(TEST_FIN);

// --- saga

export const saga = [
  takeLatest(TEST_ACTION, sagaTestSaga),
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

  if (payload.onComplete) {
    payload.onComplete();
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
  console.log('reducer.action.payload========>',action.payload)
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

