import { Controller } from 'egg'

export default class ManagerController extends Controller {
  public async index (): Promise<any> {
    const { ctx } = this
    ctx.body = '管理员列表'
  }
  public async add (): Promise<any> {
    const { ctx } = this
    ctx.body = '增加管理员'
  }
  public async edit (): Promise<any> {
    const { ctx } = this
    ctx.body = '编辑管理员'
  }
  public async delete (): Promise<any> {
    const { ctx } = this
    ctx.body = '删除管理员'
  }
}
