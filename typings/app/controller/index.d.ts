// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportAdminAccess from '../../../app/controller/admin/access';
import ExportAdminBase from '../../../app/controller/admin/base';
import ExportAdminLogin from '../../../app/controller/admin/login';
import ExportAdminManager from '../../../app/controller/admin/manager';
import ExportAdminRole from '../../../app/controller/admin/role';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    admin: {
      access: ExportAdminAccess;
      base: ExportAdminBase;
      login: ExportAdminLogin;
      manager: ExportAdminManager;
      role: ExportAdminRole;
    }
  }
}
