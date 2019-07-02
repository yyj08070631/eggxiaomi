import { Context } from 'egg'
import BaseController from '../base'
import RoleService from '../../../service/admin/system/role'

export default class RoleController extends BaseController {
  public operator: RoleService = this.service.admin.system.role
  constructor (ctx: Context) {
    super(ctx)
  }
  /**
   * @description 禁用/启用条目
   * @param {string} _id 要禁用/启用的条目
   * @param {boolean} isForbid 禁用/启用
   * @returns null || {}
   * @memberof RoleController
   */
  public async forbid (): Promise<any> {
    let { ctx, operator } = this
    if (!operator) { return null }
    let { _id, isForbid }: { _id: string, isForbid: boolean } = ctx.request.body
    ctx.body = await operator.forbid(_id, isForbid)
  }
}
