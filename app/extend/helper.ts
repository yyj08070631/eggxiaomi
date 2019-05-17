import * as path from 'path'

export default {
  resolve (dir): string { return path.join(__dirname, '../..', dir) }
}
