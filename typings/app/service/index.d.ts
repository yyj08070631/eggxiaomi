// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTools from '../../../app/service/tools';
import ExportAdminBase from '../../../app/service/admin/base';
import ExportAdminSystemAccess from '../../../app/service/admin/system/access';
import ExportAdminSystemRole from '../../../app/service/admin/system/role';

declare module 'egg' {
  interface IService {
    tools: ExportTools;
    admin: {
      base: ExportAdminBase;
      system: {
        access: ExportAdminSystemAccess;
        role: ExportAdminSystemRole;
      }
    }
  }
}
