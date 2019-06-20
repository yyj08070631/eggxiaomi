import BaseController from './base'
import { Types } from 'mongoose'

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

export default class AccessController extends BaseController {
  /**
   * @returns {object} { navigation: 有权限的导航菜单列表, operation: 有权限的操作列表 }
   */
  public async index (): Promise<any> {
    const { ctx } = this
    let navigation: object[] = await ctx.model.Access.aggregate()
      .lookup({ from: 'access', localField: '_id', foreignField: 'parent_id', as: 'children' })
      .match({ type: 1 })
      .sort({ sort: 1, 'children.sort': 1 })
    let operation: object[] = await ctx.model.Access.find({ type: 3 })
    ctx.body = { code: 0, data: { navigation, operation }, msg: '列表查询成功' }
  }
  /**
   * @returns {Access[]} 所有权限的列表
   */
  public async global (): Promise<any> {
    const { ctx } = this
    let global: Access[] = [] // 权限列表结果
    try {
      // 递归查询自关联的 access 表，直接得出权限树结构
      global = await ctx.model.Access.aggregate()
        .match({ type: 1 })
        .graphLookup({ from: 'access', startWith: '_id', connectFromField: '_id', connectToField: 'parent_id', as: 'children', maxDepth: 4 })
        .unwind({ path: '$children', preserveNullAndEmptyArrays: true })
        .sort({ 'children.type': -1 })
        .group({ _id: '$_id', children: { $push: '$children' }, parent_id: { $first: '$parent_id' }, name: { $first: '$name' }, type: { $first: '$type' }, url: { $first: '$url' }, description: { $first: '$description' }, sort: { $first: '$sort' } })
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
      ctx.body = { code: 3, data: error.toString(), msg: '列表查询失败' }
    }
    // 根据 sort 字段降序排序
    let sortSortDesc = (arr: Access[]): Access[] => {
      arr = arr.sort((val1, val2) => val1.sort - val2.sort)
      arr.forEach(item => { sortSortDesc(item.children) })
      return arr
    }
    global = sortSortDesc(global)
    // 输出结果
    ctx.body = { code: 0, data: global, msg: '列表查询成功' }
  }
  /**
   * @param {string} parent_id 父节点的 _id
   * @param {string} name 权限名称
   * @param {number} type 权限类型：1-模块、2-菜单、3-操作
   * @param {string} url 权限对应地址
   * @param {string} description 权限节点描述
   * @param {number} sort 排序
   */
  public async add (): Promise<any> {
    const { ctx } = this
    let data: Access = ctx.request.body
    // 若 parent_id 不为空字符串，则将其转换为 ObjectId 再进行存储
    let parentId: Types.ObjectId | string = data.parent_id ? Types.ObjectId(data.parent_id) : ''
    let access = new ctx.model.Access(Object.assign(data, { parent_id: parentId }))
    try {
      await access.save()
      ctx.body = { code: 0, data: {}, msg: '权限添加成功' }
    } catch (error) {
      ctx.body = { code: 3, data: error.toString(), msg: '权限添加失败' }
    }
  }
  /**
   * @param {string} _id 要修改节点的 _id
   * @param {string} name 权限名称
   * @param {string} url 权限对应地址
   * @param {string} description 权限节点描述
   * @param {number} sort 排序
   */
  public async edit (): Promise<any> {
    const { ctx } = this
    let data: Access = ctx.request.body
    let { _id, name, url, description, sort } = data
    try {
      await ctx.model.Access.updateOne({ _id }, { name, url, description, sort })
    } catch (error) {
      ctx.body = { code: 3, data: error.toString(), msg: '权限修改失败' }
    }
    ctx.body = { code: 0, data: {}, msg: '权限修改成功' }
  }
}
