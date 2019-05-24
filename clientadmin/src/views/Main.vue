<template>
  <div v-if="userInfo" class="main">
    <el-container style="height:100vh;">
      <el-header class="main-header">
        <div class="main-header__left">
          <router-link to="/" class="logo">小米商城后台</router-link>
        </div>
        <div class="main-header__right">
          <el-dropdown>
            <span style="color:#fff;cursor:pointer;">
              {{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside class="main-aside" width="200px">
          <el-menu class="main-menu">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>导航一</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// tool
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$axios.get('/admin/logout').then(res => {
        this.$message.success('登出成功')
        this.$router.push({ path: '/login' })
      })
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    // get user info
    this.$axios.get('/adminapi/user/info').then(res => {
      this.$store.commit('setUserInfo', res.data)
    })
  }
}
</script>
<style>
.main .main-header {
  display: flex;
  justify-content: space-between;
  background-color: #409EFF;
  line-height: 60px;
  font-size: 12px;
  color: #333;
  text-align: right;
}
.main .main-header__left .logo {
  display: block;
  padding: 0 15px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}
.main .main-aside {
  height: calc(100vh - 60px);
  color: #333;
}
.main .main-menu {
  height: calc(100vh - 60px);
}
</style>
