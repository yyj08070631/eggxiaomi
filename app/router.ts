import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app
  router.get('/admin', controller.home.admin)
  router.get('/admin/code', controller.admin.base.code)
  router.post('/admin/login', controller.admin.login.login)
  router.get('/admin/logout', controller.admin.login.logout)
  router.get('/adminapi/user/info', controller.admin.login.getUserInfo)
  // 用户管理
  router.get('/adminapi/manager', controller.admin.manager.index)
  router.get('/adminapi/manager/add', controller.admin.manager.add)
  router.get('/adminapi/manager/edit', controller.admin.manager.edit)
  router.get('/adminapi/manager/delete', controller.admin.manager.delete)
  // 角色管理
  router.get('/adminapi/role', controller.admin.role.index)
  router.post('/adminapi/role/add', controller.admin.role.add)
  router.post('/adminapi/role/edit', controller.admin.role.edit)
  router.get('/adminapi/role/delete', controller.admin.role.delete)
  // 权限管理
  router.get('/adminapi/access', controller.admin.access.index)
  router.get('/adminapi/access/add', controller.admin.access.add)
  router.get('/adminapi/access/edit', controller.admin.access.edit)
  router.get('/adminapi/access/delete', controller.admin.access.delete)
}
