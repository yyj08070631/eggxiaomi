// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccess from '../../../app/model/access';
import ExportAdmin from '../../../app/model/admin';
import ExportEnum from '../../../app/model/enum';
import ExportRole from '../../../app/model/role';

declare module 'egg' {
  interface IModel {
    Access: ReturnType<typeof ExportAccess>;
    Admin: ReturnType<typeof ExportAdmin>;
    Enum: ReturnType<typeof ExportEnum>;
    Role: ReturnType<typeof ExportRole>;
  }
}
