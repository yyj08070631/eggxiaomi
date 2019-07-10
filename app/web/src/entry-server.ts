import { createApp } from './app'

// export default (context: any = {}) => {
export default () => {
  const { app } = createApp()
  return app
}
