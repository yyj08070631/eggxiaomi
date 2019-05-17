import { Controller } from 'egg'
import * as fs from 'fs'

export default class HomeController extends Controller {
  public async admin () {
    const { ctx } = this
    ctx.body = fs.readFileSync(ctx.helper.resolve('/app/public/admin/index.html')).toString()
  }
}
