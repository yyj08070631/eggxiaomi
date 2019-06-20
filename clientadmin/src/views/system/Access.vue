<template>
  <div v-loading.body="loading" class="access">
    <!-- 权限树结构 -->
    <el-tree :data="access"
      default-expand-all
      node-key="_id"
      :expand-on-click-node="false">
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ `${data.name}（排序：${data.sort}）` }}</span>
        <span>
          <el-button v-if="data.type < 3" type="text" size="large" @click="appendAccessNode(data)"><i class="el-icon-circle-plus-outline"></i></el-button>
          <el-button type="text" size="large" @click="modifyAccessNode(data)"><i class="el-icon-edit"></i></el-button>
          <el-button type="text" size="large" @click="removeAccessNode(data)"><i class="el-icon-delete"></i></el-button>
        </span>
      </span>
    </el-tree>
    <!-- 添加一级节点按钮 -->
    <el-button type="primary" size="mini" style="margin-top:20px;" @click="appendAccessNode({ _id: '', type: 0, name: '根' })">添加一级节点</el-button>
    <!-- 添加/修改权限弹窗 -->
    <access-modify :visible="visible" :title="title" :default-data="defaultData" @update="init" @close="visible = false"></access-modify>
  </div>
</template>
<script>
// components
import AccessModify from './access/AccessModify'
// tools
import AccessDataModel from './access/accessDataModel'

export default {
  name: 'Access',
  components: {
    AccessModify
  },
  data: () => ({
    loading: false,
    access: [], // 权限列表
    visible: false, // 添加/修改权限弹窗开关
    title: '', // 新增/修改弹窗的标题
    // 新增/修改需要传入的默认数据
    defaultData: new AccessDataModel({})
  }),
  methods: {
    // 获取权限列表
    init () {
      this.loading = true
      this.$axios.get('/adminapi/access/global').then(res => {
        this.access = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 添加权限节点
    appendAccessNode (data) { this.visible = true; this.title = `在 ${data.name} 节点下添加权限`; this.defaultData = new AccessDataModel({ parent_id: data._id, type: data.type + 1 }) },
    // 修改权限节点
    modifyAccessNode (data) { this.visible = true; this.title = `修改 ${data.name} 节点权限`; this.defaultData = new AccessDataModel(data) },
    // 移除权限节点
    removeAccessNode (data) {
      this.$confirm(`确认删除 ${data.name} 节点吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/adminapi/delete', {
          model: 'Access',
          id: data._id
        }).then(res => {
          this.$message.success('删除权限成功')
          this.init()
        })
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
