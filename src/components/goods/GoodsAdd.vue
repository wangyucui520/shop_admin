<template>
  <div>
    <el-steps
      :active="activeIndex"
      finish-status="success"
    >
      <el-step
        title="第一步"
        description="基本信息"
      ></el-step>
      <el-step
        title="第二步"
        description="商品图片"
      ></el-step>
      <el-step
        title="第三步"
        description="商品内容"
      ></el-step>
    </el-steps>
    <el-tabs
      tab-position="left"
      style="height: 200px;"
      v-model='activeName'
    >
      <el-tab-pane
        name='one'
        label="用户管理"
      >用户管理</el-tab-pane>
      <el-tab-pane
        name='two'
        label="配置管理"
      >配置管理</el-tab-pane>
      <el-tab-pane
        name='three'
        label="角色管理"
      >角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制步骤条
      activeIndex: 1,
      // 控制标签页
      activeName: 'one'
    }
  }
}
</script>

<style>
</style>
