import Router from 'koa-router'

import { token } from './resolvers/robots/queries'
import { createRobot } from './resolvers/robots/mutations'

export const router = new Router()

// GET /me
router.get('/me', ctx => { ctx.body = ctx.state.user })

// POST /register { password: '', name: '' }
router.post('/register', async function (ctx, next) {
  await next()

  const fields = ctx.request.body
  const robot = (await createRobot({ }, { fields }, { })).toObject()
  delete robot.passwordHash
  delete robot.salt

  ctx.set('Content-Type', 'application/json; charset=utf-8')
  ctx.body = JSON.stringify(robot)
})

// POST /register { _id: 'WmtB7' }
router.post('/token', async function (ctx, next) {
  await next()

  const { _id } = ctx.request.body
  const instance = await token({ }, { _id })

  ctx.set('Content-Type', 'application/json; charset=utf-8')
  ctx.body = JSON.stringify(instance)
})
