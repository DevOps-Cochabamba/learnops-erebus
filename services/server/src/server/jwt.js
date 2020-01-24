import jwt from 'koa-jwt'
import jwksRsa from 'jwks-rsa'

import { get } from '../settings'

const { audience, jwksUri, jwksHost, issuer, jwksRequestsPerMinute } = get('jwt')

export const jsonWebToken = jwt({
  secret: jwksRsa.koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute,
    jwksUri: jwksUri || `${jwksHost}/.well-known/jwks.json`
  }),
  issuer,
  audience,
  algorithms: ['RS256'],
})

// authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5EY3lORFZDUkVRd1JUZ3pSamd5T0RjeU5UQTFNREpEUVRNM01rSTBRemRDT0RnME1qTXhRZyJ9.eyJuaWNrbmFtZSI6ImdhcnkuYXNjdXkiLCJuYW1lIjoiZ2FyeS5hc2N1eUBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNDUyZjMxMGFjODI5NjQ3YmM5ODA0OWE2MDJiYThhOTA_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZnYS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAxOS0xMi0wNFQwMToxMTowNC41OTNaIiwiZW1haWwiOiJnYXJ5LmFzY3V5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9lcmVidXMtdGhlc2lzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1YmVlYmE4MDVlOTAwMzY5NDgzZTU0NTUiLCJhdWQiOiI4MkpIbE5BM1VPcUptbHd6VVFTY2lFT2tzY0x6QXlhOSIsImlhdCI6MTU3NTQzMTEwMywiZXhwIjoxNTc1NDY3MTAzLCJhdF9oYXNoIjoidTdZZ2NTNU1YeEtkV1MyaENiOTBLdyIsIm5vbmNlIjoiSnRRWjJJOVZYaWUxTHhTbU1GOXNtWUZLN1pGVmxyUjcifQ.ExXC5XvS6nnwfhOa2bdQd6GCKGZCGFo9E2R2MhWwRlmWlmn93tzWp2siwD9CWQOEono5pRC8feoK_eq6hJaOochQwFuCi2Fd4cEtWqMbzALjCURURkuz5vS836wlbpumEMeuUfCqC02O5lE-TtZDJu6_6wQrouqYZJn2TPAUtQq0ZCVk4Uhj8vaS-DHCm3kiZfmQkjUzGrURFjK2wOJIN_7pTORgqKnMrvRAMq35TaTl34S6cIKaEY-9nP4Awqm9Fn3CJFgTkpFMjBoMOJ60PQ_98QmAQOR5Kbalwb1YKwC4NoeBkrsEymIA3YKR9AzAgRE02hoEaRMcsbT_OG9Uug
const user = {
  "nickname": "gary.ascuy",
  "name": "gary.ascuy@gmail.com",
  "picture": "https://s.gravatar.com/avatar/452f310ac829647bc98049a602ba8a90?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fga.png",
  "updated_at": "2019-12-04T01:11:04.593Z",
  "email": "gary.ascuy@gmail.com",
  "email_verified": false,
  "iss": "https://erebus-thesis.auth0.com/",
  "sub": "auth0|5beeba805e900369483e5455",
  "aud": "82JHlNA3UOqJmlwzUQSciEOkscLzAya9",
  "iat": 1575431103,
  "exp": 1575467103,
  "at_hash": "u7YgcS5MXxKdWS2hCb90Kw",
  "nonce": "JtQZ2I9VXie1LxSmMF9smYFK7ZFVlrR7"
}

const fake = (ctx, next) => {
  ctx.state['user'] = user
  return next()
}

export const conditionalJsonWebToken = (ctx, next) => {
  if (ctx.path === '/graphql') {
    return ctx.request.method === 'POST' ? fake(ctx, next) : next()
  }

  return next()
}
