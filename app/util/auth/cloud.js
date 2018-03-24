import LY from 'lvyii_storage';

export async function testLY(payload) {
  return await LY.Cloud.run('cloudTest',payload)
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