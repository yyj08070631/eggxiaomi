import BaseService from '../base'
import { Context } from 'egg'
import { Types } from 'mongoose'
import { Code } from '../../../enum'

interface Access {
  _id: string
  parent_id: string // 父节点的 _id
  name: string // 权限名称
  type: number // 权限类型：1-模块、2-菜单、3-操作
  url: string // 权限对应地址
  description: string // 权限节点描述
  sort: number // 排序
  children: Access[] // 子节点列表
}
// 将 Access 类型构成的数组中 status 不为‘正常’的项删除
function deleteInvalidItem (list: Access[]): Access[] {
  list.forEach((item: any, index: number) => {
    if (item.status !== 1) { list.splice(index, 1) } else { deleteInvalidItem(item.children || []) }
  })
  return list
}
// 对 Access 类型构成的数组根据 sort 字段降序排序
function sortSortDesc (list: Access[]): Access[] {
  list = list.sort((val1, val2) => val1.sort - val2.sort)
  list.forEach(item => { sortSortDesc(item.children) })
  return list
}

export default class AccessService extends BaseService {
  constructor (ctx: Context) {
    super(ctx)
    this.currModel = ctx.model.Access
  }
  /**
   * @description 返回管理站权限信息
   * @returns {object} { navigation: 有权限的导航菜单列表, operation: 有权限的操作列表 }
   * @memberof AccessService
   */
  public async auth (): Promise<any> {
    const { currModel } = this
    let navigation: Access[] = await currModel.aggregate()
      .lookup({ from: 'access', localField: '_id', foreignField: 'parent_id', as: 'children' })
      .match({ type: 1, status: 1 })
      .sort({ sort: 1, 'children.sort': 1 })
    navigation = deleteInvalidItem(navigation)
    let operation: any[] = await currModel.find({ type: 3, status: 1 })
    return { code: Code.成功, data: { navigation, operation }, msg: '查询成功' }
  }
  /**
   * @description 返回权限列表
   * @returns {Array<Access>} 所有权限的列表
   * @memberof AccessService
   */
  public async list (): Promise<any> {
    const { ctx } = this
    let global: Access[] = [] // 权限列表结果
    try {
      // 递归查询自关联的 access 表，直接得出权限树结构
      global = await ctx.model.Access.aggregate()
        .match({ type: 1, status: 1 })
        .graphLookup({ from: 'access', startWith: '_id', connectFromField: '_id', connectToField: 'parent_id', as: 'children', maxDepth: 4 })
        .unwind({ path: '$children', preserveNullAndEmptyArrays: true })
        .sort({ 'children.type': -1 })
        .group({ _id: '$_id', children: { $push: '$children' }, parent_id: { $first: '$parent_id' }, name: { $first: '$name' }, type: { $first: '$type' }, url: { $first: '$url' }, description: { $first: '$description' }, sort: { $first: '$sort' }, add_time: { $first: '$add_time' }, status: { $first: '$status' } })
        .addFields({
          children: {
            $reduce: {
              input: '$children',
              initialValue: {
                currentType: -1,
                currentTypeProjects: [],
                previousTypeProjects: []
              },
              in: {
                $let: {
                  vars: {
                    prev: { $cond: [{ $eq: ['$$value.currentType', '$$this.type'] }, '$$value.previousTypeProjects', '$$value.currentTypeProjects'] },
                    current: { $cond: [{ $eq: ['$$value.currentType', '$$this.type'] }, '$$value.currentTypeProjects', []] }
                  },
                  in: {
                    currentType: '$$this.type',
                    previousTypeProjects: '$$prev',
                    currentTypeProjects: {
                      $concatArrays: [
                        '$$current',
                        [
                          {
                            $mergeObjects: [
                              '$$this',
                              { children: { $filter: { input: '$$prev', as: 'e', cond: { $eq: ['$$e.parent_id', '$$this._id'] } } } }
                            ]
                          }
                        ]
                      ]
                    }
                  }
                }
              }
            }
          }
        })
        .addFields({ children: '$children.currentTypeProjects' })
    } catch (error) {
      return { code: Code.通用错误代码, data: {}, msg: '列表查询失败' }
    }
    global = deleteInvalidItem(global)
    global = sortSortDesc(global)
    // 输出结果
    return { code: Code.成功, data: { list: global }, msg: '列表查询成功' }
  }
  /**
   * @description 新建权限
   * @param {object} data 新建文档数据
   * @returns {Document} 新建的权限文档
   * @memberof AccessService
   */
  public async create (data: Access): Promise<any> {
    // 若 parent_id 不为空字符串，则将其转换为 ObjectId 再进行存储
    let parentId: Types.ObjectId | string = data.parent_id ? Types.ObjectId(data.parent_id) : ''
    let result = await super.create(Object.assign(data, { parent_id: parentId }))
    return { code: Code.成功, data: result, msg: '创建成功' }
  }
  /**
   * @description 更新权限
   * @param {string} _id 要更新文档的 _id
   * @param {object} data 新建文档数据
   * @returns {Document} 更新的权限文档
   * @memberof AccessService
   */
  public async update (_id: string ,data: Access): Promise<any> {
    // 若 parent_id 不为空字符串，则将其转换为 ObjectId 再进行存储
    let parentId: Types.ObjectId | string = data.parent_id ? Types.ObjectId(data.parent_id) : ''
    let result = await super.update(_id, Object.assign(data, { parent_id: parentId }))
    return { code: Code.成功, data: result, msg: '更新成功' }
  }
}
