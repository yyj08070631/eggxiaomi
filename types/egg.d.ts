export class Agent {
  static defaultMaxListeners: any;
  static init(): void;
  static listenerCount(emitter: any, type: any): any;
  static usingDomains: boolean;
  constructor(options: any);
  addListener(type: any, listener: any): any;
  addSingleton(name: any, create: any): void;
  all(args: any): any;
  beforeClose(fn: any): void;
  beforeStart(scope: any): void;
  callback(): any;
  close(): any;
  createAnonymousContext(req: any): any;
  createContext(req: any, res: any): any;
  curl(url: any, opts: any): any;
  del(args: any): any;
  dumpConfig(): void;
  dumpConfigToObject(): any;
  dumpTiming(): void;
  emit(type: any, args: any): any;
  eventNames(): any;
  get(args: any): any;
  getLogger(name: any): any;
  getMaxListeners(): any;
  handleRequest(ctx: any, fnMiddleware: any): any;
  head(args: any): any;
  inspect(): any;
  listen(args: any): any;
  listenerCount(type: any): any;
  listeners(type: any): any;
  off(type: any, listener: any): any;
  on(type: any, listener: any): any;
  once(type: any, listener: any): any;
  onerror(err: any): void;
  options(args: any): any;
  patch(args: any): any;
  post(args: any): any;
  prependListener(type: any, listener: any): any;
  prependOnceListener(type: any, listener: any): any;
  put(args: any): any;
  rawListeners(type: any): any;
  ready(flagOrFunction: any): any;
  readyCallback(name: any, opts: any): any;
  redirect(args: any): any;
  register(args: any): any;
  removeAllListeners(type: any, ...args: any[]): any;
  removeListener(type: any, listener: any): any;
  resources(args: any): any;
  setMaxListeners(n: any): any;
  toAsyncFunction(fn: any): any;
  toJSON(): any;
  toPromise(obj: any): any;
  url(name: any, params: any): any;
  use(fn: any): any;
}
export namespace Agent {
  class EventEmitter {
    // Circular reference from index.Agent.EventEmitter
    static EventEmitter: any;
    static defaultMaxListeners: any;
    static init(): void;
    static listenerCount(emitter: any, type: any): any;
    static usingDomains: boolean;
    addListener(type: any, listener: any): any;
    emit(type: any, args: any): any;
    eventNames(): any;
    getMaxListeners(): any;
    listenerCount(type: any): any;
    listeners(type: any): any;
    off(type: any, listener: any): any;
    on(type: any, listener: any): any;
    once(type: any, listener: any): any;
    prependListener(type: any, listener: any): any;
    prependOnceListener(type: any, listener: any): any;
    rawListeners(type: any): any;
    removeAllListeners(type: any, ...args: any[]): any;
    removeListener(type: any, listener: any): any;
    setMaxListeners(n: any): any;
  }
}
export class AgentWorkerLoader {
  getAppInfo(): any;
  getAppname(): any;
  getEggPaths(): any;
  getExtendFilePaths(name: any): any;
  getHomedir(): any;
  getLoadUnits(): any;
  getOrderPlugins(allPlugins: any, enabledPluginNames: any, appPlugins: any): any;
  getPluginPath(plugin: any): any;
  getServerEnv(): any;
  getServerScope(): any;
  getTypeFiles(filename: any): any;
  load(): void;
  loadAgentExtend(): void;
  loadApplicationExtend(): void;
  loadBootHook(): void;
  loadConfig(): void;
  loadContextExtend(): void;
  loadController(opt: any): void;
  loadCustomAgent(): void;
  loadCustomApp(): void;
  loadCustomLoader(): void;
  loadExtend(name: any, proto: any): void;
  loadFile(filepath: any, inject: any): any;
  loadHelperExtend(): void;
  loadMiddleware(opt: any): void;
  loadPlugin(): void;
  loadRequestExtend(): void;
  loadResponseExtend(): void;
  loadRouter(): void;
  loadService(opt: any): void;
  loadToApp(directory: any, property: any, opt: any): void;
  loadToContext(directory: any, property: any, opt: any): void;
  mergePluginConfig(plugin: any): void;
  normalizePluginConfig(plugins: any, name: any, configPath: any): void;
  readPluginConfigs(configPaths: any): any;
  requireFile(filepath: any): any;
  resolveModule(filepath: any): any;
}
export class AppWorkerLoader {
  getAppInfo(): any;
  getAppname(): any;
  getEggPaths(): any;
  getExtendFilePaths(name: any): any;
  getHomedir(): any;
  getLoadUnits(): any;
  getOrderPlugins(allPlugins: any, enabledPluginNames: any, appPlugins: any): any;
  getPluginPath(plugin: any): any;
  getServerEnv(): any;
  getServerScope(): any;
  getTypeFiles(filename: any): any;
  load(): void;
  loadAgentExtend(): void;
  loadApplicationExtend(): void;
  loadBootHook(): void;
  loadConfig(): void;
  loadContextExtend(): void;
  loadController(opt: any): void;
  loadCustomAgent(): void;
  loadCustomApp(): void;
  loadCustomLoader(): void;
  loadExtend(name: any, proto: any): void;
  loadFile(filepath: any, inject: any): any;
  loadHelperExtend(): void;
  loadMiddleware(opt: any): void;
  loadPlugin(): void;
  loadRequestExtend(): void;
  loadResponseExtend(): void;
  loadRouter(): void;
  loadService(opt: any): void;
  loadToApp(directory: any, property: any, opt: any): void;
  loadToContext(directory: any, property: any, opt: any): void;
  mergePluginConfig(plugin: any): void;
  normalizePluginConfig(plugins: any, name: any, configPath: any): void;
  readPluginConfigs(configPaths: any): any;
  requireFile(filepath: any): any;
  resolveModule(filepath: any): any;
}
export class Application {
  static defaultMaxListeners: any;
  static init(): void;
  static listenerCount(emitter: any, type: any): any;
  static usingDomains: boolean;
  constructor(options: any);
  server: any;
  addListener(type: any, listener: any): any;
  addSingleton(name: any, create: any): void;
  all(args: any): any;
  beforeClose(fn: any): void;
  beforeStart(scope: any): void;
  callback(): any;
  close(): any;
  createAnonymousContext(req: any): any;
  createContext(req: any, res: any): any;
  curl(url: any, opts: any): any;
  del(args: any): any;
  dumpConfig(): void;
  dumpConfigToObject(): any;
  dumpTiming(): void;
  emit(type: any, args: any): any;
  eventNames(): any;
  get(args: any): any;
  getLogger(name: any): any;
  getMaxListeners(): any;
  handleRequest(ctx: any, fnMiddleware: any): void;
  head(args: any): any;
  inspect(): any;
  listen(args: any): any;
  listenerCount(type: any): any;
  listeners(type: any): any;
  off(type: any, listener: any): any;
  on(type: any, listener: any): any;
  onClientError(err: any, socket: any): void;
  onServer(server: any): void;
  once(type: any, listener: any): any;
  onerror(err: any): void;
  options(args: any): any;
  patch(args: any): any;
  post(args: any): any;
  prependListener(type: any, listener: any): any;
  prependOnceListener(type: any, listener: any): any;
  put(args: any): any;
  rawListeners(type: any): any;
  ready(flagOrFunction: any): any;
  readyCallback(name: any, opts: any): any;
  redirect(args: any): any;
  register(args: any): any;
  removeAllListeners(type: any, ...args: any[]): any;
  removeListener(type: any, listener: any): any;
  resources(args: any): any;
  runInBackground(scope: any): void;
  setMaxListeners(n: any): any;
  toAsyncFunction(fn: any): any;
  toJSON(): any;
  toPromise(obj: any): any;
  url(name: any, params: any): any;
  use(fn: any): any;
}
export namespace Application {
  class EventEmitter {
    // Circular reference from index.Application.EventEmitter
    static EventEmitter: any;
    static defaultMaxListeners: any;
    static init(): void;
    static listenerCount(emitter: any, type: any): any;
    static usingDomains: boolean;
    addListener(type: any, listener: any): any;
    emit(type: any, args: any): any;
    eventNames(): any;
    getMaxListeners(): any;
    listenerCount(type: any): any;
    listeners(type: any): any;
    off(type: any, listener: any): any;
    on(type: any, listener: any): any;
    once(type: any, listener: any): any;
    prependListener(type: any, listener: any): any;
    prependOnceListener(type: any, listener: any): any;
    rawListeners(type: any): any;
    removeAllListeners(type: any, ...args: any[]): any;
    removeListener(type: any, listener: any): any;
    setMaxListeners(n: any): any;
  }
}
export class BaseContextClass {
}
export class Boot {
  constructor(instance: any);
}
export class Controller {
}
export class Service {
}
export class Subscription {
}
export function start(options: any): any;
export function startCluster(options: any, callback: any): void;
