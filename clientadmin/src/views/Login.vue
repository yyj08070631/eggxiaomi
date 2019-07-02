<template>
  <div class="login">
    <div class="login-dialog">
      <el-form ref="form" :model="form" label-width="80px" style="padding-top:30px;">
        <el-form-item label="用户名">
          <el-input v-model="form.account" placeholder="请输入用户名" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" placeholder="请输入密码" show-password @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.code" placeholder="请输入验证码" style="width:200px;" @keyup.enter.native="login"></el-input>
          <img src="/admin/code" ref="code" style="float:right;cursor:pointer;" alt="验证码" @click="reloadCode">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        account: 'admin',
        password: '123456',
        code: ''
      }
    }
  },
  methods: {
    login () {
      this.$axios.post('/admin/login', this.form).then(res => {
        this.$message.success('登录成功')
        this.$router.push('/')
      }).catch(() => {
        // reload auth code while login request failed
        this.$refs.code.src = '/admin/code'
      })
    },
    reloadCode (e) { e.target.src = '/admin/code' }
  }
}
</script>
<style>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: cadetblue;
}
.login-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -100px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 500px;
  height: 300px;
  margin: auto;
  background-color: #fff;
}
</style>
