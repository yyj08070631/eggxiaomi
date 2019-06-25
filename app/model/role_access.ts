export default app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const RoleAccessSchema = new Schema({
    role_id: { type: String },
    access_id: { type: String },
    status: { type: Number, default: 1 },
    add_time: { type: Number, default: Date.now() }
  })

  return mongoose.model('RoleAccess', RoleAccessSchema, 'role_access')
}
