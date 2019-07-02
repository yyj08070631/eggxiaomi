<template>
  <div class="role-modify">
    <el-dialog :title="defaultData._id ? `编辑角色：${defaultData.title}` : '新增角色'"
      :visible="visible"
      @close="$emit('close')">
      <el-form :model="roleForm" :rules="roleFormRules" ref="roleForm" label-width="100px">
        <el-form-item label="角色名称" prop="title">
          <el-input v-model="roleForm.title" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" placeholder="请输入角色描述"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" prop="auth">
          <el-tree :data="accessList"
            show-checkbox
            default-expand-all
            ref="accessTree"
            node-key="_id"
            :props="{ label: 'name' }"
            :default-checked-keys="roleForm.auth"
            @check-change="roleForm.auth = $refs.accessTree.getCheckedKeys()">
          </el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="$emit('close')">取消</el-button>
        <el-button v-if="!defaultData._id" type="primary" @click="appendRole">新增</el-button>
        <el-button v-else type="primary" @click="modifyRole">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import RoleDataModel from './roleDataModel.js'

export default {
  name: 'RoleModify',
  props: {
    visible: { type: Boolean },
    defaultData: { type: Object, default: () => ({}) }
  },
  data: () => ({
    roleForm: new RoleDataModel(), // 角色信息
    // 角色表单校验规则
    roleFormRules: {
      title: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
      auth: [{ type: 'array', required: true, message: '请至少选择一个权限', trigger: 'blur' }]
    },
    accessList: [] // 权限列表
  }),
  methods: {
    // 获取权限列表
    initAccessList () {
      this.$axios.get('/adminapi/access_list').then(res => {
        this.accessList = res.data.list
      })
    },
    // 新增角色
    appendRole () {
      this.validateForm('roleForm').then(() => {
        this.$axios.post('/adminapi/role_create', this.roleForm).then(res => {
          this.$message.success('新增角色成功')
          this.$emit('close')
          this.$emit('update')
        })
      })
    },
    // 修改角色
    modifyRole () {
      this.validateForm('roleForm').then(() => {
        this.$axios.post('/adminapi/role_update', this.roleForm).then(res => {
          this.$message.success('修改角色成功')
          this.$emit('close')
          this.$emit('update')
        })
      })
    },
    // 表单校验
    validateForm (formName) { return new Promise((resolve, reject) => { this.$refs[formName].validate((valid) => { valid && resolve() }) }) }
  },
  watch: {
    defaultData: {
      deep: true,
      handler (val) { this.roleForm = new RoleDataModel(val) }
    },
    // 保证当前角色权限列表变化时，树结构 ui 同步变化
    'roleForm.auth' (val) { this.$refs.accessTree && this.$refs.accessTree.setCheckedKeys(val) }
  },
  created () {
    this.initAccessList()
  }
}
</script>
<style>
</style>
