import BaseController from './base'

export default class RoleController extends BaseController {
  public async index (): Promise<any> {
    const { ctx } = this
    ctx.body = '角色列表'
  }
  public async add (): Promise<any> {
    const { ctx } = this
    ctx.body = '增加角色'
  }
  public async edit (): Promise<any> {
    const { ctx } = this
    ctx.body = '编辑角色'
  }
  public async delete (): Promise<any> {
    const { ctx } = this
    ctx.body = '删除角色'
  }
}
