<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">后台管理系统</span>
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name" placeholder="请输入用户名" class="name"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请输入邮箱" class="email"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pwd">
            <el-input type="password" v-model="registerUser.pwd" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpass">
            <el-input type="password" v-model="registerUser.checkpass" placeholder="请再次输入密码"></el-input>
          </el-form-item>

          <el-form-item label="注册身份" prop="identity ">
            <el-select v-model="registerUser.identity" placeholder="请选择身份">
              <el-option label="员工" value="employee"></el-option>
              <el-option label="管理员" value="manager"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">提交</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>已有账号?现在
              <router-link to="/login">登录</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "123",
        email: "123@123.com",
        pwd: "123456",
        checkpass: "123456",
        identity: "employee"
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 15, message: "用户名长度为2-15字符", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        pwd: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "密码长度为6-30字符", trigger: "blur" }
        ],
        checkpass: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "密码长度为6-30字符", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ],
        identity: [
          { required: true, message: "请选择注册身份", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/register", this.registerUser)
            .then(response => {
              //注册成功
              this.$message({
                message: "账号注册成功",
                type: "success"
              });
              this.$router.push("/login");
            })
            .catch(err => {
              this.$message({
                message: err,
                type: "error"
              });
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
