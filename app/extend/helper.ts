import * as path from 'path'

export default {
  /**
   * @description 获取文件地址绝对路径
   * @param {string} dir 要获取的文件地址
   * @returns {string} 绝对路径
   */
  resolve (dir: string): string { return path.join(__dirname, '../..', dir) },
  /**
   * @description 查询关键词转义
   * @param {string} word 查询关键词
   * @returns {string} 转义结果
   */
  escapeWords (word: string): string { return word.replace(/(\\|\$|\*|\(|\)|\*|\+|\.|\[|\]|\?|\^|\{|\}|\|)/g, '\\$1') }
}
