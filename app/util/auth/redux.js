import {call, put, takeLatest} from 'redux-saga/effects';
import {createAction} from 'redux-actions';
import {REHYDRATE} from 'redux-persist'
import {Record, Map, Set, List} from 'immutable'
import * as api from './cloud';

// --- model

class AuthState extends Record({
  token: undefined,             // current login user token
  curUserId: undefined,         // current login user
  usersById: Map(),             // Map<user id, User>
}, 'AuthState') {}

class User extends Record({
  id: undefined,                        // 用户编号
  username: undefined,                  // 用户名
  mobilePhone: undefined,               // 手机号
  loginDate : undefined,                // 登陆时间
  engine: undefined,                    // 幽能数量
  crystal: undefined,                   // 水晶数量
  availableEngineNum: undefined,        // 可获取幽能的次数
  address: undefined,                   // 公钥地址
}, 'User') {
  static fromJson(json) {
    const imm = new User();

    return imm.withMutations((m) => {
      m.set('id', json.id);
      m.set('username', json.username);
      m.set('mobilePhone', json.mobilePhone);
      m.set('loginDate', json.loginDate);
      m.set('engine', json.engine);
      m.set('crystal', json.crystal);
      m.set('availableEngineNum', json.availableEngineNum);
      m.set('address', json.address);
    });
  }
}


// --- constant

const REQ_SMS_CODE = 'REQ_SMS_CODE'
const LOGIN_WITH_PHONE = 'LOGIN_WITH_PHONE'
const LOGIN_WITH_TOKEN = 'LOGIN_WITH_TOKEN';
const SAVE_USER = 'SAVE_USER'
const USER_LOGIN = 'USER_LOGIN'

// --- action

export const action = {
  loginWithPhoneNumber: createAction(LOGIN_WITH_PHONE),
  requestSmsCode: createAction(REQ_SMS_CODE),
  loginWithToken: createAction(LOGIN_WITH_TOKEN),
};

const userLogin = createAction(USER_LOGIN)

// --- saga

export const saga = [
  takeLatest(LOGIN_WITH_PHONE, sagaLoginWithPhoneNumber),
  takeLatest(REQ_SMS_CODE, sagaRequestSmsCode),
  takeLatest(LOGIN_WITH_TOKEN, sagaLoginWithToken)
];

function* sagaLoginWithPhoneNumber(action) {
  let payload = action.payload
  
  try {
    let userInfo = yield call(api.loginWithPhoneNumber, payload)
    if (!userInfo) {
      if (payload.error) {
        payload.error()
      }
      return
    }
    yield put(userLogin({user: userInfo}))
    
    if (payload.success) {
      payload.success()
    }
  } catch (e) {
    console.log('error in redux', e)
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

function* sagaLoginWithToken(action) {
  const payload = action.payload;
  
  try {
    const params = {};
    
    ({token: params.token} = payload);
    
    const userInfo = yield call(api.become, params);
    yield put(userLogin({user: userInfo}))
  
    if (payload.success) {
      payload.success()
    }
    
    console.log('login with token succeeded：', userInfo);
  } catch(e) {
    console.error('login with token failed：', e);
    if (payload.error) {
      payload.error()
    }
  }
}

// --- reducer

const initialState = new AuthState();

export function reducer(state=initialState, action) {
  switch(action.type) {
    case USER_LOGIN:
      return userLoginReducer(state, action)
    case REHYDRATE:
      return onRehydrate(state, action);
    default:
      return state
  }
}

function userLoginReducer(state, action) {
  let user = action.payload.user
  let userRecord = User.fromJson(user)
  state = state.set('curUserId', user.id)
  state = state.set('token', user.token)
  state = state.setIn(['usersById', user.id], userRecord)
  return state
}

function onRehydrate(state, action) {
  let incoming = action.payload ? action.payload.AUTH : undefined
  if (!incoming) {
    return state
  }
  
  state = state.set('curUserId', incoming.curUserId)
  state = state.set('token', incoming.token)
  
  let usersById = Map(incoming.usersById)
  for (let [userId, user] of usersById) {
    if(userId && user) {
      let userRecord = User.fromJson(user)
      state = state.setIn(['usersById', userId], userRecord)
    }
  }
  
  return state
}

// --- selector

function selectCurUser(appState) {
  const curUserId = appState.AUTH.curUserId;
  if (curUserId === undefined)
    return undefined;

  return selectUserById(appState, curUserId);
}

/**
 * Get user detail by user id.
 * @param {Object} appState
 * @param {String} userId
 * @returns {User} JSON representation of User object
 */
function selectUserById(appState, userId) {
  if (!userId) {
    return undefined
  }
  
  const immUser = appState.AUTH.getIn(['usersById', userId]);
  if (immUser === undefined)
    return undefined;
  
  return immUser.toJS();
}

function selectLoginUserToken(appState) {
  return appState.AUTH.token;
}

export const selector = {
  selectCurUser,
  selectUserById,
  selectLoginUserToken,
};