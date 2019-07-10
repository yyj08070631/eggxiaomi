import Vue from '../../../node_modules/vue'
import App from './App.vue'

// export let createApp = (context: any = {}) => {
export let createApp = () => {
  const app = new Vue({
    render: h => h(App)
  })
  return { app }
}
