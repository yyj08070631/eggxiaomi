<template>
  <div id="app">
    <input v-model="msg">
    <p>msg: {{ msg }}</p>
    <p>computed msg: {{ computedMsg }}</p>
    <button @click="greet">Greet</button>
  </div>
</template>
<script lang="ts">
import Vue from '../../../node_modules/vue'
import Component from '../../../node_modules/vue-class-component'

@Component
export default class App extends Vue {
  // 初始化数据
  msg = 12332353

  // 声明周期钩子
  mounted () {
    this.greet()
  }

  // 计算属性
  get computedMsg () {
    return 'computed ' + this.msg
  }

  // 方法
  greet () {
    alert('greeting: ' + this.msg)
  }
}
</script>
