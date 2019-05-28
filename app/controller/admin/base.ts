import { Controller } from 'egg'

export default class BaseController extends Controller {
  public async code (): Promise<any> {
    let { ctx } = this
    let captcha: any = await ctx.service.tools.captcha()
    ctx.response.type = 'image/svg+xml' // 配置返回给客户端的验证码类型
    ctx.body = captcha.data
  }
  // 通用删除方法
  public async delete (): Promise<any> {
    let { ctx } = this
    let { model, id }: { model: string, id: string } = ctx.request.body
    try {
      await ctx.model[model].deleteOne({ _id: id })
      ctx.body = { code: 0, data: {}, msg: '删除成功' }
    } catch (error) {
      ctx.body = { code: 3, data: error.toString(), msg: '删除失败' }
    }
  }
}
