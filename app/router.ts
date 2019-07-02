import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app
  // 通用
  router.get('/admin', controller.home.admin)
  router.get('/admin/code', controller.admin.base.code)
  router.post('/admin/login', controller.admin.login.login)
  router.get('/admin/logout', controller.admin.login.logout)
  router.get('/adminapi/user_info', controller.admin.login.getUserInfo)
  // 用户管理
  router.get('/adminapi/manager', controller.admin.system.manager.index)
  router.post('/adminapi/manager/add', controller.admin.system.manager.add)
  router.post('/adminapi/manager/edit', controller.admin.system.manager.edit)
  // 角色管理
  router.get('/adminapi/role_list', controller.admin.system.role.list)
  router.post('/adminapi/role_create', controller.admin.system.role.create)
  router.post('/adminapi/role_update', controller.admin.system.role.update)
  router.post('/adminapi/role_delete', controller.admin.system.role.delete)
  router.post('/adminapi/role_forbid', controller.admin.system.role.forbid)
  // 权限管理
  router.get('/adminapi/access_auth', controller.admin.system.access.auth)
  router.get('/adminapi/access_list', controller.admin.system.access.list)
  router.post('/adminapi/access_create', controller.admin.system.access.create)
  router.post('/adminapi/access_update', controller.admin.system.access.update)
  router.post('/adminapi/access_delete', controller.admin.system.access.delete)
}
