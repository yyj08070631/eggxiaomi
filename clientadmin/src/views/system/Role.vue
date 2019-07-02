<template>
  <div class="role">
    <condition-filter placeholder="角色名称">
    </condition-filter>
    <el-card>
      <!-- 添加角色 -->
      <el-button type="primary" style="margin-bottom:12px;" @click="setDefaultData({}); visible = true">添加角色</el-button>
      <!-- 表格主体 -->
      <el-table :data="list"
        :default-sort="{ prop: 'add_time', order: 'descending' }"
        border
        style="width:100%;"
        @sort-change="sortChange">
        <el-table-column prop="title" label="角色名称" sortable="custom"></el-table-column>
        <el-table-column prop="description" label="描述" sortable="custom"></el-table-column>
        <el-table-column prop="add_time" label="创建时间" sortable="custom" :formatter="(row, column, cellValue) => formatDate(cellValue)"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="setDefaultData(row); visible = true">编辑</el-button>
            <el-button type="text" @click="forbidRole(row)">{{ row.isForbid ? '启用' : '禁用' }}</el-button>
            <el-button type="text" @click="deleteRole(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加/修改角色弹窗 -->
    <role-modify :visible="visible" :default-data="defaultData" @update="init" @close="visible = false"></role-modify>
  </div>
</template>
<script>
// components
import RoleModify from './role/RoleModify'
import ConditionFilter from '@/components/ConditionFilter.vue'
// tools
import listMixin from '@/mixins/list.js'
import RoleDataModel from './role/roleDataModel.js'
import formatDate from '@/utils/date/formatDate.js'

export default {
  name: 'Role',
  mixins: [listMixin()],
  components: {
    ConditionFilter,
    RoleModify
  },
  data: () => ({
    LIST_URL: '/adminapi/role_list',
    visible: false, // 添加/修改角色弹窗开关
    defaultData: new RoleDataModel(), // 新增/修改需要传入的默认数据
    sort: { add_time: -1 } // 默认排序
  }),
  methods: {
    // 删除角色
    deleteRole (row) {
      this.$confirm(`确认删除角色 ${row.title} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/adminapi/role_delete', {
          _id: row._id
        }).then(res => {
          this.$message.success(res.msg)
          this.init()
        })
      })
    },
    // 禁用/启用角色
    forbidRole (row) {
      this.$confirm(`确认${row.isForbid ? '启用' : '禁用'}角色 ${row.title} 吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/adminapi/role_forbid', {
          _id: row._id,
          isForbid: !row.isForbid
        }).then(res => {
          this.$message.success(res.msg)
          this.init()
        })
      })
    },
    formatDate,
    // 设置添加/修改弹窗默认数据
    setDefaultData (data) { this.defaultData = new RoleDataModel(data) }
  }
}
</script>
<style>

</style>
