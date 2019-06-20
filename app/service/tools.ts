import { Service } from 'egg'
import * as svgCaptcha from 'svg-captcha'
import * as md5 from 'md5'

export default class ToolsService extends Service {
  public async captcha (): Promise<any> {
    let { ctx } = this
    let captcha = svgCaptcha.create({
      size: 6,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966'
    })
    ctx.session.code = captcha.text // 保存验证码文案
    return captcha
  }
  public async md5 (str: string): Promise<string> { return md5(str) }
}
