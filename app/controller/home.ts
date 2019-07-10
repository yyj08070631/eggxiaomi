import { Controller } from 'egg'
import * as fs from 'fs'
import * as microcache from 'route-cache'

const isProd: boolean = process.env.NODE_ENV === 'production'
const useMicroCache: boolean = process.env.MICRO_CACHE !== 'false'

export default class HomeController extends Controller {
  /**
   * @description 渲染管理站前端静态文件
   * @memberof HomeController
   */
  public async admin () {
    const { ctx } = this
    ctx.body = fs.readFileSync(ctx.helper.resolve('/app/public/admin/index.html')).toString()
  }
  /**
   * @description 渲染主页 vue-ssr 内容
   * @memberof HomeController
   */
  public async index () {
    let { ctx } = this
    // const serve = (path, cache) => express.static(resolve(path), {
    //   maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
    // })
    // ctx.app.use(compression({ threshold: 0 }))
    // ctx.app.use('/dist', serve('./dist', true))
    // ctx.app.use('/public', serve('./public', true))
    // ctx.app.use('/manifest.json', serve('./manifest.json', true))
    // ctx.app.use('/service-worker.js', serve('./dist/service-worker.js'))
    // since this app has no user-specific content, every page is micro-cacheable.
    // if your app involves user-specific content, you need to implement custom
    // logic to determine whether a request is cacheable based on its url and
    // headers.
    // 1-second microcache.
    // https://www.nginx.com/blog/benefits-of-microcaching-nginx/
    ctx.app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))
    console.time('renderToString spend')
    const context = {
      title: 'xiaomi',
      url: ctx.request.url
    }
    ctx.renderer.renderToString(context, (err, html) => {
      if (err) { throw err }
      ctx.body = html
      if (!isProd) {
        console.timeEnd('renderToString spend')
      }
    })
  }
}
