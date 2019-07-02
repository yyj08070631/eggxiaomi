export default app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  /**
   * @param {String} title 角色名称
   * @param {String} description 角色描述
   * @param {Array<string>} auth 角色所有的权限 _id
   * @param {Number} status 通用状态
   * @param {Boolean} isForbid 是否禁用
   * @param {Number} add_time 创建时间
   */
  const RoleSchema = new Schema({
    title: { type: String },
    description: { type: String },
    auth: [],
    status: { type: Number, default: 1 },
    isForbid: { type: Boolean, default: false },
    add_time: { type: Number, default: Date.now() }
  })

  return mongoose.model('Role', RoleSchema, 'role')
}
