export default {
  /* eslint-disable */
  name: 'users',
  data() {
    return {
      tableData: [
        {
          username: '飞飞',
          email: 'fei@qq.com',
          mobile: 12345677823
        },
        {
          username: 'kei',
          email: 'lei@qq.com',
          mobile: 12332112324
        }
      ],
      // 总条数
      total: 0,
      // 当前页
      pagenum: 1,
      input3: '',
      // 是否显示模态框
      dialogaddVisible: false,
      // 添加用户表单对象
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入正确的用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: '请输入正确的密码',
            trigger: 'blur'
          },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    /* eslint-disable */
    this.getUserName()
  },
  methods: {
    // 渲染列表
    async getUserName(pagenum = 1, query = '') {
      let res = await this.$axios.get('users', {
        params: {
          // 查询参数
          query,
          // 当前页码
          pagenum,
          //	每页显示条数
          pagesize: 2
        }
      })
      this.tableData = res.data.data.users
      this.total = res.data.data.total
      //   // 每页条数
      this.pagenum = res.data.data.pagenum
      // console.log(res)

      // .then(res => {
      //   console.log(res)
      //   console.log(res.data.data.users)
      //   // 保存列表数据
      //   this.tableData = res.data.data.users
      //   this.total = res.data.data.total
      //   // 每页条数
      //   this.pagenum = res.data.data.pagenum
      // })
    },
    // 分页
    curentPageChange(a) {
      console.log(a)
      this.getUserName(a, this.input3)
    },
    search() {
      // console.log(this.input3)
      this.getUserName(1, this.input3)
    },
    // 显示模态框
    showAdd() {
      this.dialogaddVisible = true
    },
    // 添加用户
    async addUser() {
      let res = await this.$axios.post('users', this.addForm, {})
      if (res.data.meta.status == 201) {
        this.$message({
          message: '添加成功',
          type: 'success',
          duration: 800
        })
        // 关闭对话框
        this.dialogaddVisible = false
        // 重新刷新
        this.getUserName(1)
      }
      // .then(res => {
      // console.log(res)
      // if (res.data.meta.status == 201) {
      //   this.$message({
      //     message: '添加成功',
      //     type: 'success',
      //     duration: 800
      //   })
      //   // 关闭对话框
      //   this.dialogaddVisible = false
      //   // 重新刷新
      //   this.getUserName(1)
      // }
      // })
    },
    // 关闭对话框的回调
    closeDialog() {
      console.log('关闭了')
      this.$refs.addModel.resetFields()
    },
    // 删除其中一项
    async delContent(id) {
      console.log(id)
      let res = await this.$axios.delete(`users/${id}`)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 800
        })
      }
      //  .then(res => {
      //   console.log(res)
      //   if (res.data.meta.status === 200) {
      //     this.$message({
      //       message: '删除成功',
      //       type: 'success',
      //       duration: 800
      //     })
      //   }
      // })
      this.getUserName()
    },
    // 改变状态
    async statusChange(row) {
      // console.log(1)
      const { id, mg_state } = row
      let res = await this.$axios.put(`users/${id}/state/${mg_state}`)
      if (res.data.meta.status === 200) {
        this.$message({
          message: '设置状态成功',
          type: 'success',
          duration: 800
        })
      }
      //  .then(res => {
      //   console.log(res)
      //   if (res.data.meta.status === 200) {
      //     this.$message({
      //       message: '设置状态成功',
      //       type: 'success',
      //       duration: 800
      //     })
      //   }
      // })
    }
  }
}
