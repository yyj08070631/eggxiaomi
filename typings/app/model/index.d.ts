// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccess from '../../../app/model/access';
import ExportAdmin from '../../../app/model/admin';
import ExportRole from '../../../app/model/role';
import ExportRoleAccess from '../../../app/model/role_access';

declare module 'egg' {
  interface IModel {
    Access: ReturnType<typeof ExportAccess>;
    Admin: ReturnType<typeof ExportAdmin>;
    Role: ReturnType<typeof ExportRole>;
    RoleAccess: ReturnType<typeof ExportRoleAccess>;
  }
}
