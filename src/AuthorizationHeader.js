import JSSHA from 'jsSHA'

export default function getAuthorizationHeader () {
  const AppID = '3f1a209e632642208b8c84607c4c959b' // import.meta.env.VUE_APP_ID
  const AppKey = 'pPkBWEgkY8H3KV-KEQdQ8HWORBo' // import.meta.env.VUE_APP_KEY
  const GMTString = new Date().toGMTString()
  const ShaObj = new JSSHA('SHA-1', 'TEXT', { encoding: 'UTF8' })
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  const HMAC = ShaObj.getHMAC('B64')
  const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`
  return { Authorization: Authorization, 'X-Date': GMTString }
}
