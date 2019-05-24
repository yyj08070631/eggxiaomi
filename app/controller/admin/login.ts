import BaseController from './base'

export default class LoginController extends BaseController {
  public async login (): Promise<any> {
    const { ctx } = this
    let { account, password, code }: { account: string, password: string, code: string } = ctx.request.body
    if (code.toLocaleLowerCase() === ctx.session.code.toLocaleLowerCase()) {
      password = await ctx.service.tools.md5(password)
      let result: object[] = await ctx.model.Admin.find({ username: account, password: password })
      if (result.length > 0) {
        ctx.session.userinfo = result[0]
        ctx.rotateCsrfSecret() // 刷新 csrf token
        ctx.body = { code: 0, data: {}, msg: '登录成功' }
      } else {
        ctx.body = { code: 3, data: {}, msg: '用户名或密码错误' }
      }
    } else {
      ctx.body = { code: 3, data: {}, msg: '验证码错误' }
    }
  }
  public async logout (): Promise<any> {
    const { ctx } = this
    ctx.session.userinfo = null
    ctx.body = { code: 0, data: {}, msg: '已退出登录' }
  }
  public async getUserInfo (): Promise<any> {
    const { ctx } = this
    if (ctx.session.userinfo) {
      ctx.body = { code: 0, data: ctx.session.userinfo, msg: '成功' }
    } else {
      ctx.body = { code: 1, data: {}, msg: '用户未登录' }
    }
  }
}
