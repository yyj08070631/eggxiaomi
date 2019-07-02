import BaseService from '../base'
import { Context } from 'egg'
import { Code } from '../../../enum'

export default class RoleService extends BaseService {
  constructor (ctx: Context) {
    super(ctx)
    this.currModel = ctx.model.Role
    this.searchFields = ['title']
  }
  /**
   * @description 禁用/启用条目
   * @param {string} _id 要禁用/启用的条目
   * @param {boolean} isForbid 禁用/启用
   * @returns {object} {}
   * @memberof RoleService
   */
  public async forbid (_id: string, isForbid: Boolean): Promise<any> {
    await this.update(_id, { isForbid })
    return { code: Code.成功, data: {}, msg: isForbid ? '禁用成功' : '启用成功' }
  }
}
