import { Controller, Context } from 'egg'
import BaseService from '../../service/admin/base'

export default class BaseController extends Controller {
  public operator: BaseService = this.service.admin.base
  constructor (ctx: Context) {
    super(ctx)
  }
  /**
   * @description 获取验证码
   * @memberof BaseController
   */
  public async code (): Promise<any> {
    let { ctx } = this
    let captcha: any = await ctx.service.tools.captcha()
    ctx.response.type = 'image/svg+xml' // 配置返回给客户端的验证码类型
    ctx.body = captcha.data
  }
  /**
   * @description 创建文档
   * @memberof BaseController
   * @returns null
   */
  public async create (): Promise<any> {
    let { ctx, operator } = this
    if (!operator) { return null }
    ctx.body = await operator.create(ctx.request.body)
  }
  /**
   * @description 更新文档
   * @memberof BaseController
   * @returns null
   */
  public async update (): Promise<any> {
    let { ctx, operator } = this
    if (!operator) { return null }
    let { _id }: { _id: string } = ctx.request.body
    ctx.body = await operator.update(_id, ctx.request.body)
  }
  /**
   * @description 查询列表
   * @memberof BaseController
   * @returns null
   */
  public async list (): Promise<any> {
    let { ctx, operator } = this
    if (!operator) { return null }
    let { pageIndex, pageSize, where, sort, filter, search } = ctx.request.body
    ctx.body = await operator.list(pageIndex, pageSize, where, sort, filter, search)
  }
  /**
   * @description 逻辑删除文档
   * @memberof BaseController
   * @returns null
   */
  public async delete (): Promise<any> {
    let { ctx, operator } = this
    if (!operator) { return null }
    let { _id }: { _id: string } = ctx.request.body
    ctx.body = await operator.delete(_id)
  }
}
