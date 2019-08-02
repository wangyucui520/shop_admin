export default {
  /* eslint-disable */

  data() {
    return {
      // 角色列表
      rolesData: [
        {
          roleName: '王小虎',
          roleDesc: '上海'
        }
      ],
      // 分配权限
      dialogAssignRightsVisible: false,
      // 树形控件
      treeDate: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleId: 0
    }
  },
  created() {
    this.loadRolesDate()
    this.loadAssign()
  },
  methods: {
    // 索引
    indexMethod(index) {
      return index
    },
    // 角色列表
    async loadRolesDate() {
      let res = await this.$axios.get('roles')
      // console.log(res)
      this.rolesData = res.data.data
    },
    // 权限列表
    async loadAssign() {
      let res = await this.$axios.get('rights/tree')
      this.treeDate = res.data.data
      // console.log(res)
    },
    // 显示分配权限对话框
    AssignRights(row) {
      // console.log(row)
      this.dialogAssignRightsVisible = true
      this.roleId = row.id

      // 获取第三层的id
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            // console.log(item3.id)
            keys.push(item3.id)
          })
        })
      })
      //改变数据，dom更新异步，所以要用$nextTick
      // Dom更新完毕后，自动调用回调
      this.$nextTick(() => {
        // console.log(this.$refs.tree)
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    // 分配权限
    async sureAssign() {
      let key1 = this.$refs.tree.getHalfCheckedKeys()
      let key2 = this.$refs.tree.getCheckedKeys()
      let keys = [...key1, ...key2]

      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })
      console.log(res)
      if (res.data.meta == 200) {
        this.dialogAssignRightsVisible = false
        this.$message({
          message: '角色授权成功',
          type: 'success',
          duration: 800
        })
        this.loadAssign()
      }
    }
  }
}
