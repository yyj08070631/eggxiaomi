import BaseController from '../base'

export default class ManagerController extends BaseController {
  public async index (): Promise<any> {
    const { ctx } = this
    let result = await ctx.model.Admin.aggregate([
      {
        $lookup: { from: 'role', localField: 'role_id', foreignField: '_id', as: 'role' }
      }
    ])
    ctx.body = { code: 0, data: result, msg: '列表查询成功' }
  }
  public async add (): Promise<any> {
    const { ctx } = this
    let { username, password, mobile, email, role_id }: { username: string, password: string, mobile: number, email: string, role_id: string } = ctx.request.body
    password = await ctx.service.tools.md5(password)
    let admin = new ctx.model.Admin({ username, password, mobile, email, role_id })
    try {
      await admin.save()
      ctx.body = { code: 0, data: {}, msg: '用户添加成功' }
    } catch (error) {
      ctx.body = { code: 3, data: error.toString(), msg: '用户添加失败' }
    }
  }
  public async edit (): Promise<any> {
    const { ctx } = this
    let { _id, username, password, mobile, email, role_id }: { _id: string, username: string, password: string, mobile: number, email: string, role_id: string } = ctx.request.body

    let data = { username, password, mobile, email, role_id }
    // 若 password 存在则进行 md5 加密，否则不更新 password
    if (data.password) {
      data.password = await ctx.service.tools.md5(data.password)
    } else {
      delete data.password
    }
    try {
      await ctx.model.Admin.updateOne({ _id }, data)
      ctx.body = { code: 0, data: {}, msg: '用户修改成功' }
    } catch (error) {
      ctx.body = { code: 3, data: error.toString(), msg: '用户修改失败' }
    }
  }
}
