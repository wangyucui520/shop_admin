  <template>
  <div>
    <el-button
      type='success'
      plain
      @click='go2goodsAdd'
    >添加商品</el-button>
    <el-table
      :data="GoodData"
      style="width: 100%"
    >
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量"
      >
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope='scope'>
          <span>{{scope.row.add_time|dateFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
/* eslint-disable */
import moment from 'moment'
export default {
  data () {
    return {
      GoodData: [{
        goods_name: 1,
        goods_price: 2,
        goods_number: 3,
        add_time: 4
      }]
    }
  },
  // 过滤器
  filters: {
    dateFilter (res) {
      return moment(res).format('YYYY-MM-DD')
    }
  },
  created () {
    this.loadGoodsDate()
  },
  methods: {
    async loadGoodsDate () {
      let res = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 4

        }
      })
      console.log(res);
      this.GoodData = res.data.data.goods

    },
    // 跳转goodsAdd
    go2goodsAdd () {
      this.$router.push('/goods-add')
    }
  }
}
  </script>

<style>
</style>
