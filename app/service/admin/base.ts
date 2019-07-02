import { Service, Context } from 'egg'
import { Code, RowStatus } from '../../enum'
import { isNumber, isBoolean, isDate, isEmpty } from 'lodash'
import { Model, Document } from 'mongoose'

export default class BaseService extends Service {
  public currModel: Model<Document>
  public searchFields: Array<string> = []
  public validateRule: Array<object> = []
  constructor (ctx: Context) {
    super(ctx)
  }
  /**
   * @description 创建文档
   * @param {object} data 新增的数据
   * @memberof BaseService
   * @returns {object} 返回信息
   */
  public async create (data: object): Promise<any> {
    let { currModel } = this
    let dataModel = new currModel(data)
    let doc: Document = await dataModel.save()
    return { code: Code.成功, data: doc, msg: '添加成功' }
  }
  /**
   * @description 修改文档
   * @param {string} _id 要修改文档的 _id
   * @param {object} data 修改的数据
   * @memberof BaseService
   * @returns {object} 返回信息
   */
  public async update (_id: string, data: object): Promise<any> {
    let { currModel } = this
    let doc = await currModel.update({ _id }, data)
    return { code: Code.成功, data: doc, msg: '更新成功' }
  }
  /**
   * @param {number} pageIndex 页码
   * @param {number} pageSize 每页查询条数
   * @param {object} where 查询条件
   * @param {object} sort 排序条件
   * @param {object} filter 指定过滤字段
   * @param {string} search 指定搜索字段
   * @memberof BaseService
   * @returns {object} 返回信息
   */
  public async list (pageIndex: string = '1', pageSize: string = '15', where: any = '{}', sort: string = '{}', filter: string = '', search: string = ''): Promise<any> {
    let { ctx, currModel } = this
    // format pageIndex
    let pageIndexNum: number = Math.abs(parseInt(pageIndex, 0)) || 1
    // format pageSize
    let pageSizeNum: number = Math.abs(parseInt(pageSize, 0))
    pageSizeNum = isNaN(pageSizeNum) ? 15 : pageSizeNum
    // format search & where
    where = JSON.parse(where)
    if (search && this.searchFields.length > 0) {
      search = search.trim()
      search = ctx.helper.escapeWords(search)
      let $regex: { $regex: RegExp } = { $regex: new RegExp(search, 'i') }
      where.$or = where.$or || []
      this.searchFields.forEach(item => {
        let reg = {}
        reg[item] = $regex
        where.$or.push(reg)
      })
    }
    for (let [k, v] of Object.entries(where)) {
      if (!isNumber(v) && !isBoolean(v) && !isDate(v) && isEmpty(v)) {
        delete where[k]
      }
    }
    where = Object.assign(where, { status: 1 })
    // format sort
    sort = JSON.parse(sort)
    // start query
    let list: any[] = await currModel.find(where, filter).sort(sort).skip((pageIndexNum - 1) * pageSizeNum)
    let total: number = await currModel.countDocuments(where)
    return { code: Code.成功, data: { list, total }, msg: '查询成功' }
  }
  /**
   * @description 查询一行数据
   * @param {string} _id 要查询数据的 _id
   * @memberof BaseService
   * @returns {object} 返回信息
   */
  public async detail (_id: string): Promise<any> {
    let { currModel } = this
    let doc: Document | null = await currModel.findById(_id)
    return { code: Code.成功, data: doc, msg: '查询成功' }
  }
  /**
   * @description 删除数据
   * @param {string} id 要删除数据的 _id
   * @memberof BaseService
   * @returns {object} 返回信息
   */
  public async delete (_id: string): Promise<any> {
    await this.update(_id, { status: RowStatus.已删除 })
    return { code: Code.成功, data: {}, msg: '删除成功' }
  }
}
