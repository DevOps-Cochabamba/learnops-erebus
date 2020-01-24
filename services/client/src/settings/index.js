export const rabbitmq = {
  username: process.env.REACT_APP_RABBITMQ_USER,
  password: process.env.REACT_APP_RABBITMQ_PASSWORD,
  host: process.env.REACT_APP_RABBITMQ_HOST,
  port: parseInt(process.env.REACT_APP_RABBITMQ_PORT, 10),
  keepalive: 20,
  path: 'ws'
}

export const oauth = {
  domain: process.env.REACT_APP_AUTH_DOMAIN,
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
  callbackUrl: process.env.REACT_APP_AUTH_CALLBACK
}
