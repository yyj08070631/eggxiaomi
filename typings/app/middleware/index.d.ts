// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminauth from '../../../app/middleware/adminauth';

declare module 'egg' {
  interface IMiddleware {
    adminauth: typeof ExportAdminauth;
  }
}
