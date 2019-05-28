import BaseController from './base'

export default class RoleController extends BaseController {
  public async index (): Promise<any> {
    const { ctx } = this
    let result = await ctx.model.Role.find({})
    ctx.body = { code: 0, data: result, msg: '列表查询成功' }
  }
  public async add (): Promise<any> {
    const { ctx } = this
    let { title, description }: { title: string, description: string } = ctx.request.body
    let role = new ctx.model.Role({ title, description })
    try {
      await role.save()
      ctx.body = { code: 0, data: {}, msg: '角色添加成功' }
    } catch (error) {
      ctx.body = { code: 3, data: error.toString(), msg: '角色添加失败' }
    }
  }
  public async edit (): Promise<any> {
    const { ctx } = this
    let { _id, title, description }: { _id: string, title: string, description: string } = ctx.request.body
    try {
      await ctx.model.Role.updateOne({ _id }, { title, description })
      ctx.body = { code: 0, data: {}, msg: '角色修改成功' }
    } catch (error) {
      ctx.body = { code: 3, data: error.toString(), msg: '角色修改失败' }
    }
  }
}
