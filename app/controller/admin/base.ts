import { Controller } from 'egg'

export default class BaseController extends Controller {
  public async code (): Promise<any> {
    let { ctx } = this
    let captcha: any = await ctx.service.tools.captcha()
    ctx.response.type = 'image/svg+xml' // 配置返回给客户端的验证码类型
    ctx.body = captcha.data
  }
}
