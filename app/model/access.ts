export default app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const AccessSchema = new Schema({
    name: { type: String }, // 节点名称
    type: { type: Number }, // 节点类型：1-模块、2-菜单、3-操作
    url: { type: String }, // 页面地址
    parent_id: { type: Schema.Types.Mixed }, // 自关联id，标识其归属的父节点，若为空字符串，则为模块节点
    description: { type: String },
    sort: { type: Number, default: 0 }, // 排序顺序
    status: { type: Number, default: 1 }, // 0-已删除，1-正常
    add_time: { type: Number, default: Date.now() }
  })

  return mongoose.model('Access', AccessSchema, 'access')
}
