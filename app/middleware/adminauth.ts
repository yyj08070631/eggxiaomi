import { Context } from 'egg'

export default function adminauth (): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    console.log(ctx.csrf)
    ctx.state.csrf = ctx.csrf

    if (ctx.session.userinfo) {
      await next()
    } else {
      ctx.body = {
        code: 1,
        data: {},
        msg: '用户未登录'
      }
    }
  }
}
