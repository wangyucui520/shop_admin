<template>
  <el-container>
    <!-- 头 -->
    <el-header>Header</el-header>
    <el-container>
      <!-- 测 -->
      <el-aside width="200px">Aside</el-aside>
      <!-- 主 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style scoped>
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
</style>
