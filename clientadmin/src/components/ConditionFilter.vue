<template>
  <div class="condition-filter">
    <el-card>
      <div>sadg</div>
      <!-- 搜索框 -->
      <el-input v-model="keyword" :placeholder="placeholder" class="filter-search-input" @keyup.enter.native="search">
        <i slot="suffix" class="el-icon-search el-input__icon" @click="search"></i>
      </el-input>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'ConditionFilter',
  props: {
    placeholder: { type: String, default: '' }
  },
  data: () => ({
    keyword: '' // 搜索关键字
  }),
  methods: {
    // 启动搜索
    search () { this.$parent.search = this.keyword; this.$parent.init() }
  },
  created () {
  }
}
</script>
<style>
.condition-filter {
  margin-bottom: 12px;
}
.condition-filter .el-card__body {
  overflow: hidden;
}
.condition-filter .filter-search-input {
  float: right;
  width: 250px;
}
</style>
