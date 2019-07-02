<template>
  <div v-if="userInfo" class="main">
    <el-container style="height:100vh;">
      <!-- 后台头部 -->
      <el-header class="main-header">
        <div class="main-header__left">
          <router-link to="/" class="logo">小米商城后台</router-link>
        </div>
        <div class="main-header__right">
          <el-dropdown trigger="click">
            <span style="color:#fff;cursor:pointer;">
              {{ userInfo.username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <!-- 侧边栏导航 -->
      <el-container>
        <el-aside class="main-aside" width="200px">
          <el-menu :default-active="$route.path" unique-opened router class="main-menu">
            <el-submenu v-for="block in navigationInfo" :key="block._id" :index="block._id">
              <template slot="title">{{ block.name }}</template>
              <el-menu-item v-for="menu in block.children" :key="menu._id" :index="menu.url">{{ menu.name }}</el-menu-item>
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
  name: 'Main',
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
    ...mapGetters(['userInfo', 'navigationInfo'])
  },
  created () {
    // get user info
    this.$axios.get('/adminapi/user_info').then(res => {
      this.$store.commit('setUserInfo', res.data)
    })
    // get auth navigation menu and auth operation menu
    this.$axios.get('/adminapi/access_auth').then(res => {
      this.$store.commit('setAuthInfo', res.data)
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
