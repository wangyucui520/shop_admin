<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
      >
      </el-pagination>
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="状态"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
      >
      </el-table-column>

    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size='2'
      :current-page="pagenum"
      @current-change='curentPageChange'
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData: [{
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
      total: 0,
      pagenum: 1
    }
  },
  created () {
    /* eslint-disable */
    this.getUserName()
  },
  methods: {
    getUserName (pagenum = 1) {
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query: '',
          pagenum,
          // 每页条数
          pagesize: 2
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
        console.log(res.data.data.users)
        // 保存列表数据
        this.tableData = res.data.data.users
        this.total = res.data.data.total
        // 每页条数
        this.pagenum = res.data.data.pagenum


      })
    },
    // 分页
    curentPageChange (a) {
      console.log(a)
      this.getUserName(a)
    }
  }

}
</script>

<style>
</style>
