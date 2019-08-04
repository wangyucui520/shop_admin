 <template>
  <div>
    <el-button
      type='success'
      plain
      @click='showAddCatDialog'
    >添加分类</el-button>
    <el-table
      :data="catData"
      style="width: 100%"
    >
      <el-table-column
        type='expand'
        width="50"
      >
        <template slot-scope='scope'>
          <el-tree
            :data="scope.row.children"
            :props="defaultProps"
          ></el-tree>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="是否有效"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{scope.row.cat_deleted?'否':'是'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="层级"
      >
        <template slot-scope='scope'>
          <span v-if='scope.row.cat_level==0'>一级</span>
          <span v-else-if='scope.row.cat_level==1'>二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加分类 -->
    <el-dialog
      title="添加分类"
      :visible.sync="dialogAddCatVisible"
    >
      <el-form
        :model="addCatForm"
        label-width="80px"
      >
        <el-form-item label="分类名称">
          <el-input
            v-model="addCatForm.cat_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- 三级联动 -->
          <el-cascader
            v-model='addCatForm.cat_pid_arr'
            :options="options"
            :props='defaultProps2'
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCat"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      catData: [{
        cat_name: '王小虎',
        cat_deleted: '有效',
        cat_level: '二级'
      }],
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      },
      dialogAddCatVisible: false,
      // 添加分类表单对象
      addCatForm: {
        cat_name: "",//分类名称
        cat_pid_arr: []//父级名称
      },
      // 级联联动
      options: [{
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      defaultProps2: {
        label: 'cat_name',//负责展示 value : 负责收集
        value: 'cat_id'// 为什么要配置value ,因为级联选择器要选择标题收集数据的, 但是不知道应该收集数据里的哪个字段
      }
    }
  },
  created () {
    this.loadCatDdata()
    this.loadCatDdata2()
  },
  methods: {
    // 加载用户列表
    async loadCatDdata () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3,
          pagenum: 1,
          pagesize: 4
        }
      })
      console.log(res);
      this.catData = res.data.data.result
    },
    // 显示添加分类
    showAddCatDialog () {
      this.dialogAddCatVisible = true
    },
    //加载分类数据
    async loadCatDdata2 () {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2,
        }
      })
      console.log(res);
      this.options = res.data.data
    },
    // 添加分类
    async addCat () {
      const { cat_name, cat_pid_arr } = this.addCatForm
      let res = await this.$axios.post('categories', {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1],//最后的一项
        cat_name,
        cat_level: 2//数组的长度或者直接写个2   层级是0，1，2
      })
      console.log(res);
      if (res.data.meta.status == 201) {
        this.dialogAddCatVisible = false
        this.$message({
          message: '添加分类成功',
          type: 'success',
          duration: 800
        })
        // 刷新
        this.loadCatDdata()
      }


    }
  }
}
  </script>

<style>
</style>
