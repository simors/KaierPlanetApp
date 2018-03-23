import LY from 'lvyii_storage';

export async function testLY(payload) {
  console.log('hehre is hahaha===>',payload)
  return await LY.Cloud.run('cloudTest',payload)
}