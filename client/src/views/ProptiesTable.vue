<template>
  <div class="proptiestable">
    <el-row type="flex" class="row-bg" justify="end">
      <el-form ref="form" label-width="80px">
        <el-form-item flexd="right">
          <el-button type="primary" @click="handleAdd()" style="margin-right:40px">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-form :inline="true">
      <el-form-item label="按照时间筛选">
        <el-date-picker
          v-model="dateSelection"
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="dateFilter" icon="search">筛选</el-button>
      <el-button @click="clearFilter">清除筛选条件</el-button>
    </el-form>

    <div class="tableContainer">
      <template v-if="tableData.length>0">
        <el-table :data="tableData" style="width: 100%" max-height="530" highlight-current-row>
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
          <el-table-column prop="remark" label="备注" align="center" width="120"></el-table-column>
          <el-table-column prop="operation" label="操作" v-if="user.identity==='manager'" align="center" fixed="right" width="160">
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
        <el-row>
          <el-col :span="24">
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="paginations.page_index"
                :page-sizes="paginations.page_sizes"
                :page-size="paginations.page_size"
                :layout="paginations.layout"
                :total="paginations.total"
              ></el-pagination>
            </div>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <div class="container">
          <span class="title">暂时没有数据 ...</span>
        </div>
      </template>
    </div>
    <Dialog :dialog="dialog" :formData="formData" @updateData="fetchData"></Dialog>
  </div>
</template>

<script>
import moment from "moment";
import Dialog from "../components/Dialog";
export default {
  name: "proptiestable",
  data() {
    return {
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      dateSelection: "",
      paginations: {
        page_index: 1, //当前页数
        total: 0, //总数
        page_size: 5, //一页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total,sizes,prev,pager,next,jumper" //翻页属性
      },
      tableData: [],
      allTableData: [],
      filterTableData: [],
      formData: {
        type: "",
        describe: "",
        income: "",
        spend: "",
        cash: "",
        remark: "",
        _id: ""
      },
      dialog: {
        title: "",
        option: "",
        show: false
      }
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
    user(){
      return this.$store.state.user
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    isAuthenticated: function() {
      console.log("login state changed");
    }
  },
  methods: {
    fetchData() {
      //获取数据
      this.$axios
        .get("/api/profiles")
        .then(result => {
          this.allTableData = result.data;
          this.filterTableData = result.data;
          this.setPaginations();
        })
        .catch(err => {
          console.log(err);
        });
    },
    timeFormatter(dateStr) {
      return moment(dateStr).format("YYYY-MM-DD HH:mm:ss");
    },
    handleEdit(index, row) {
      Object.assign(this.formData, row);
      this.parseIntSthinObject(this.formData, ["income", "spend", "cash"]);
      this.formData.id = row._id;
      delete this.formData._id;
      this.dialog.option = "edit";
      this.dialog.title = "修改条目";
      this.dialog.show = true;
    },
    handleDelete(index, row) {
      this.$axios
        .delete(`/api/profiles/delete/${row._id}`)
        .then(res => {
          this.$message("删除成功");
          this.fetchData();
        })
        .catch(err => {
          this.$message({
            message: "提交失败!请联系管理人员!",
            type: "error"
          });
        });
    },
    handleAdd() {
      (this.formData = {
        type: "",
        describe: "",
        income: "",
        spend: "",
        cash: "",
        remark: "",
        id: ""
      }),
        (this.dialog.option = "add");
      this.dialog.title = "添加条目";
      this.dialog.show = true;
    },

    setPaginations() {
      this.paginations.total = this.filterTableData.length;
      this.paginations.page_index = 1;
      // this.paginations.page_size = 5;
      this.tableData = this.filterTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.filterTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      this.tableData = this.filterTableData.filter((item, index) => {
        return (
          this.paginations.page_size * (page - 1) - 1 < index &&
          index < page * this.paginations.page_size
        );
      });
    },
    dateFilter() {
      if (!this.dateSelection) {
        this.$message({
          message: "请选择开始和结束时间!",
          type: "error"
        });
      } else {
        Object.assign(this.filterTableData, this.allTableData);
        this.filterTableData = this.filterTableData.filter(item => {
          let date = new Date(item.date);
          let time = date.getTime();
          return time >= this.dateSelection[0] && time <= this.dateSelection[1];
        });
        this.setPaginations();
      }
    },
    clearFilter() {
      Object.assign(this.filterTableData, this.allTableData);
      this.setPaginations();
    },
    parseIntSthinObject(obj, keyArr) {
      keyArr.forEach((e, i) => {
        if (obj[e] !== undefined) {
          obj[e] = parseInt(obj[e]);
        }
      });
    }
  },
  components: {
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
.pagination {
  text-align: center;
  /* margin-top: 10px;
  margin-right: 40px */
}
</style>
