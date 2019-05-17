// This file is created by egg-ts-helper@1.25.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTools from '../../../app/service/tools';

declare module 'egg' {
  interface IService {
    tools: ExportTools;
  }
}
