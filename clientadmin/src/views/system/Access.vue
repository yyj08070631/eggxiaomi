<template>
  <div v-loading.body="loading" class="access">
    <el-card>
      <!-- 添加一级节点按钮 -->
      <el-button type="primary" style="margin-bottom:12px;" @click="appendAccessNode({ _id: '', type: 0, name: '根' })">添加一级节点</el-button>
      <!-- 权限树结构 -->
      <el-table :data="list"
        border
        default-expand-all
        row-key="_id"
        style="width:100%;">
        <el-table-column prop="name" label="名称" width="150"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="url" label="路由地址"></el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="160" :formatter="(row, column, cellValue) => formatDate(cellValue)"></el-table-column>
        <el-table-column prop="sort" label="排序" width="60"></el-table-column>
        <el-table-column label="操作" width="130" align="center" header-align="left">
          <template slot-scope="{ row }">
            <el-button v-if="row.type < 3" type="text" @click="appendAccessNode(row)">新建</el-button>
            <el-button type="text" @click="modifyAccessNode(row)">编辑</el-button>
            <el-button type="text" @click="removeAccessNode(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加/修改权限弹窗 -->
    <access-modify :visible="visible" :title="title" :default-data="defaultData" @update="init" @close="visible = false"></access-modify>
  </div>
</template>
<script>
// components
import AccessModify from './access/AccessModify'
// tools
import listMixin from '@/mixins/list.js'
import AccessDataModel from './access/accessDataModel'
import formatDate from '@/utils/date/formatDate.js'

export default {
  name: 'Access',
  mixins: [listMixin()],
  components: {
    AccessModify
  },
  data: () => ({
    LIST_URL: '/adminapi/access_list',
    visible: false, // 添加/修改权限弹窗开关
    title: '', // 新增/修改弹窗的标题
    defaultData: new AccessDataModel({}) // 新增/修改需要传入的默认数据
  }),
  methods: {
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
        this.$axios.post('/adminapi/access_delete', {
          _id: data._id
        }).then(res => {
          this.$message.success('删除权限成功')
          this.init()
        })
      })
    },
    formatDate
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
