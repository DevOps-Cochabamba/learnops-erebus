import auth0 from 'auth0-js'

import { oauth } from './settings'

export const auth = new auth0.WebAuth({
  domain: oauth.domain,
  clientID: oauth.clientId,
  redirectUri: oauth.callbackUrl,
  responseType: 'token id_token',
  scope: 'openid email profile'
})
