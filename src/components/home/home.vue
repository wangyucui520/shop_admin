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
          <el-submenu
            :index="item1.id+''"
            v-for="item1 in menusData"
            :key='item1.id'
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item
              :index="'/'+item2.path"
              v-for='item2 in item1.children'
              :key='item2.id'
            >{{item2.authName}}</el-menu-item>
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
  /* eslint-disable */
  data () {
    return {
      // 数据信息
      menusData: []
    }
  },
  created () {
    this.loadMenusData()
  },
  methods: {
    // 动态加载左侧列表
    async loadMenusData () {
      let res = await this.$axios.get('menus')
      console.log(res);
      this.menusData = res.data.data

    },
    // 退出登录
    async loginout () {
      try {
        await this.$confirm('此操作将退出该账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800

        })
        this.$router.push('/login')
      } catch (error) {
        this.$message({
          message: '取消退出',
          /* eslint-disable */
          type: 'info'

        })
      }
    },
    handUrlPath () {
      if (this.$route.path === '/goods-add') {
        return '/goods'
      }

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
