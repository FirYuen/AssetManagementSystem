<template>
  <div class="proptiestable">
    <el-row type="flex" class="row-bg" justify="end">
      <el-form ref="form" label-width="80px">
        <el-form-item flexd="right">
          <el-button type="primary" @click="handleAdd()" style="margin-right:40px">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <div class="tableContainer">
      <template v-if="tableData.length>0">
        <el-table :data="tableData"  style="width: 100%" max-height="530">
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="date" label="创建时间" align="center" width="190">
            <template v-slot="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{timeFormatter(scope.row.date)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="收支类型" align="center" width="140"></el-table-column>
          <el-table-column prop="describe" label="收支描述" align="center" width="100"></el-table-column>
          <el-table-column prop="income" label="收入" align="center" width="80">
            <template slot-scope="scope">
              <span style="color:#f56767">{{scope.row.income}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="spend" label="支出" align="center" width="80">
            <template slot-scope="scope">
              <span style="color:#00d053">{{scope.row.spend}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cash" label="现金" align="center" width="80">
            <template slot-scope="scope">
              <span style="color:#4db3ff">{{scope.row.cash}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" align="center" width="110"></el-table-column>
          <el-table-column prop="operation" label="操作" align="center" fixed="right" width="160">
            <template v-slot="scope">
              <el-button
                size="mini"
                type="warning"
                icon="edit"
                @click="handleEdit(scope.$index,scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                icon="delete"
                @click="handleDelete(scope.$index,scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-else>
        <div class="container">
          <span class="title">暂时没有数据 ...</span>
        </div>
      </template>
    </div>
    <Dialog :dialog="dialog"></Dialog>
  </div>
</template>

<script>
import moment from "moment";
import Dialog from '../components/Dialog';
export default {
  name: "proptiestable",
  data() {
    return {
      tableData: [],
      dialog:{
        title:"添加条目",
        show:false
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      //获取数据
      this.$axios
        .get("api/profiles")
        .then(result => {
          this.tableData = result.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    timeFormatter(dateStr) {
      return moment(dateStr).format("YYYY-MM-DD HH:mm:ss");
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleAdd() {
      this.dialog.show = true
    }
  },
  components:{
    Dialog
  }
};
</script>

<style scoped>
.proptiestable {
  height: 100%;
  padding: 5px;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  /* background-color: rgba(0, 0, 0, 0.7); */
  text-align: center;
  color: #dddedd;
}
.title {
  font-size: 30px;
}



</style>
