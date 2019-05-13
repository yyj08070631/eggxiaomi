import { Controller } from 'egg'

export default class AccessController extends Controller {
  public async index (): Promise<any> {
    const { ctx } = this
    ctx.body = '权限列表'
  }
  public async add (): Promise<any> {
    const { ctx } = this
    ctx.body = '增加权限'
  }
  public async edit (): Promise<any> {
    const { ctx } = this
    ctx.body = '编辑权限'
  }
  public async delete (): Promise<any> {
    const { ctx } = this
    ctx.body = '删除权限'
  }
}
