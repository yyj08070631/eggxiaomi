import { Context } from 'egg'
import BaseController from './base'
import AccessService from '../../service/admin/system/access'

export default class AccessController extends BaseController {
  public operator: AccessService = this.service.admin.system.access
  constructor (ctx: Context) {
    super(ctx)
  }
  /**
   * @description 返回管理站权限信息
   * @returns {object} { navigation: 有权限的导航菜单列表, operation: 有权限的操作列表 }
   * @memberof AccessController
   */
  public async auth (): Promise<any> {
    let { ctx, operator } = this
    if (!operator) { return null }
    ctx.body = await operator.auth()
  }
}
