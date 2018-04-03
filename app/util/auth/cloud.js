import LY from 'lvyii_storage';

export async function become(payload) {
  const {token} = payload;
  const userInfo = await LY.User.become(token);
  return userInfo
}

export async function loginWithPhoneNumber(payload) {
  let {phoneNumber, smsCode} = payload
  
  let userInfo = await LY.User.signUpOrlogInWithMobilePhone(phoneNumber, smsCode)
  return userInfo
}

export async function sendPhoneSmsCode(payload) {
  let {phoneNumber} = payload
  
  return await LY.User.requestMobilePhoneVerify(phoneNumber)
}