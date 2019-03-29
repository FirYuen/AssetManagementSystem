<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      width="30%"
      :show-close="false"
      :append-to-body="false"
    >
      <el-form
        :model="formData"
        ref="formData"
        :rules="formDataRules"
        label-width="120px"
        style="width:auto"
      >
        <el-form-item label="收支类型" prop="type">
          <el-select v-model="formData.type">
            <el-option
              v-for="(formtype,index) in formDataType"
              :label="formtype"
              :value="formtype"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="describe" label="收支描述:">
          <el-input type="describe" v-model="formData.describe"></el-input>
        </el-form-item>
        <el-form-item prop="income" label="收入:">
          <el-input type="收入" v-model.number="formData.income"></el-input>
        </el-form-item>
        <el-form-item prop="spend" label="支出:">
          <el-input type="spend" v-model.number="formData.spend"></el-input>
        </el-form-item>
        <el-form-item prop="cash" label="账户现金:">
          <el-input type="cash" v-model.number="formData.cash"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="formData.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('formData')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Dialog",
  computed:{
    // IntIncome(){
    //   console.log(typeof parseInt(this.formData.income))
    //   console.log(parseInt(this.formData.income))
      
    //   return parseInt(this.formData.income)},
    //  IntSpend(){ return parseInt(this.formData.spend)}
  },
  data() {
    var checkNumber = (rule, value, callback) => {
      let message = {
        income: "收入",
        spend: "支出",
        cash: "现金"
      };
      if (!value) {
       
        return callback(new Error(`${message[rule.field]}不能为空`));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      formDataType: ["提现", "充值", "转账", "优惠券", "报销"],
      formDataRules: {
        type: [
          {
            required: true,
            message: "请选择收支类型",
            trigger: "blur"
          }
        ],
        describe: [
          { required: true, message: "请输入收支描述", trigger: "blur" }
        ],
        income: [
          {
            //validator: checkNumber,
              type: "number",
            required: true,
             message: "请输入收入",
            trigger: "blur"
          }
        ],
        spend: [
          {
            validator: checkNumber,
            required: true,
            trigger: "blur"
          }
        ],
        cash: [
          {
            validator: checkNumber,
            required: true,
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    dialog: Object,
    formData:Object
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          
          let url = this.dialog.option==="add"?"/api/profiles/add":`/api/profiles/edit/${this.formData.id}`
            this.$axios.post(url, this.formData).then(
              res => {
                this.$message({
                  message: "提交成功!",
                  type: "success"
                });
                // this.resetForm(formName)
                this.dialog.show = false
                this.$emit("updateData")
              },
              err => {
                this.$message({
                  message: "提交失败!请联系管理人员!",
                  type: "error"
                });
              }
            );
          
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
</style>
