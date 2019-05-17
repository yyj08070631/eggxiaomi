import BaseController from './base'

export default class LoginController extends BaseController {
  public async login (): Promise<any> {
    const { ctx } = this
    ctx.body = {
      code: 0,
      data: {},
      msg: '登录测试'
    }
  }
}
