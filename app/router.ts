import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app
  // 通用
  router.get('/admin', controller.home.admin)
  router.get('/admin/code', controller.admin.base.code)
  router.post('/admin/login', controller.admin.login.login)
  router.get('/admin/logout', controller.admin.login.logout)
  router.get('/adminapi/user/info', controller.admin.login.getUserInfo)
  // 用户管理
  router.get('/adminapi/manager', controller.admin.manager.index)
  router.post('/adminapi/manager/add', controller.admin.manager.add)
  router.post('/adminapi/manager/edit', controller.admin.manager.edit)
  // 角色管理
  router.get('/adminapi/role', controller.admin.role.index)
  router.post('/adminapi/role/add', controller.admin.role.add)
  router.post('/adminapi/role/edit', controller.admin.role.edit)
  // 权限管理
  router.get('/adminapi/access/auth', controller.admin.access.auth)
  router.get('/adminapi/access/list', controller.admin.access.list)
  router.post('/adminapi/access/create', controller.admin.access.create)
  router.post('/adminapi/access/update', controller.admin.access.update)
  router.post('/adminapi/access/delete', controller.admin.access.delete)
}
