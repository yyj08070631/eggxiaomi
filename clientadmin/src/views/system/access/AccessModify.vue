<template>
  <div class="access-modify">
    <el-dialog :title="title"
      :visible.sync="visible"
      @close="$emit('close')">
      <el-form :model="accessForm" :rules="accessFormRules" ref="accessForm" label-width="100px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="accessForm.name" placeholder="请输入权限名称"></el-input>
        </el-form-item>
        <el-form-item label="访问地址" prop="url">
          <el-input v-model="accessForm.url" placeholder="请输入访问地址"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="accessForm.description" placeholder="请输入权限名称"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="accessForm.sort" placeholder="请输入权限排序"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="$emit('close')">取消</el-button>
        <el-button v-if="!accessForm._id" type="primary" @click="appendAccess">新增</el-button>
        <el-button v-else type="primary" @click="modifyAccess">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import AccessDataModel from './accessDataModel'

export default {
  name: 'AccessModify',
  props: {
    visible: { type: Boolean },
    title: { type: String },
    defaultData: { type: Object, default: () => ({}) }
  },
  data: () => ({
    accessForm: new AccessDataModel({}), // 权限表单信息
    // 权限表单校验规则
    accessFormRules: {
      name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
      sort: [{ required: true, message: '请输入权限排序', trigger: 'blur' }]
    }
  }),
  methods: {
    // 新增权限
    appendAccess () {
      this.validateForm('accessForm').then(() => {
        this.$axios.post('/adminapi/access/add', this.accessForm).then(res => {
          this.$message.success('新增权限成功')
          this.$emit('close')
          this.$emit('update')
        })
      })
    },
    // 修改权限
    modifyAccess () {
      this.validateForm('accessForm').then(() => {
        this.$axios.post('/adminapi/access/edit', this.accessForm).then(res => {
          this.$message.success('修改权限成功')
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
      handler (val) { this.accessForm = new AccessDataModel(val) }
    }
  }
}
</script>
<style>
</style>
