// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportAdminBase from '../../../app/controller/admin/base';
import ExportAdminLogin from '../../../app/controller/admin/login';
import ExportAdminSystemAccess from '../../../app/controller/admin/system/access';
import ExportAdminSystemManager from '../../../app/controller/admin/system/manager';
import ExportAdminSystemRole from '../../../app/controller/admin/system/role';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    admin: {
      base: ExportAdminBase;
      login: ExportAdminLogin;
      system: {
        access: ExportAdminSystemAccess;
        manager: ExportAdminSystemManager;
        role: ExportAdminSystemRole;
      }
    }
  }
}
