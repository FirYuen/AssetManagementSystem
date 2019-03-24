<template>
  <div class="proptiestable">
    <template v-if="tableData.length>0">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="type" label="收支类型" align="center" width="180"></el-table-column>
        <el-table-column prop="describe" label="收支描述" align="center" width="180"></el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="100"></el-table-column>
        <el-table-column prop="spend" label="支出" align="center" width="100"></el-table-column>
        <el-table-column prop="cash" label="现金" align="center" width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="200"></el-table-column>
      </el-table>
    </template>
    <template v-else>
      <div class="container">
        <span class="title">暂时没有数据 ...</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "proptiestable",
  data() {
    return {
      tableData: []
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
          this.tableData=result.data
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.proptiestable {
  height: 100%;
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
