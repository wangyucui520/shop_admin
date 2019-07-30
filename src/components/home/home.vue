<template>
  <el-container>
    <!-- 头 -->
    <el-header>
      <el-row>
        <el-col :span='8'><img
            src="../../assets/logo.png"
            alt=""
          ></el-col>
        <el-col :span='8'>
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col
          :span='8'
          class="col3"
        >恭喜上海前端44期月薪2W <a
            @click.prevent='loginout'
            href="#"
          >退出</a></el-col>

      </el-row>
    </el-header>
    <el-container>
      <!--@open="handleOpen"
          @close="handleClose" -->
      <!-- 测 -->
      <el-aside width="200px">
        <el-menu
          :router='true'
          :default-active="handUrlPath()"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">用户列表</el-menu-item>

          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">角色列表</el-menu-item>
            <el-menu-item index="/rights">权限列表</el-menu-item>

          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">商品列表</el-menu-item>
            <el-menu-item index="3-2">分类参数</el-menu-item>
            <el-menu-item index="3-3">商品分类</el-menu-item>

          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">用户列表</el-menu-item>

          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">数据列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    loginout () {
      this.$confirm('此操作将退出该账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800

        })
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          message: '取消退出',
          /* eslint-disable */
          type: 'info'

        })
      })
    },
    handUrlPath () {
      return this.$route.path
    }

  }
}
</script>

<style scoped lang='less'>
.el-header {
  background-color: #b3c1cd;
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #eaeef1;
}
.el-container {
  height: 100%;
}
.el-header {
  padding: 0;
  h1 {
    color: #fff;
    font-size: 26px;
    text-align: center;
    line-height: 60px;
  }
  .col3 {
    padding-right: 20px;
    line-height: 60px;
    text-align: center;
  }
}
</style>
