<template>
  <div class="home">
    <div class="main"></div>
    <div class="outScroll">
      <div class="mainContainer">
        <div class="header">
          <img src="../../assets/img/bird.png">
          <span>&nbsp;草鹨旅行网</span>
        </div>
        <div class="loginTitle">
          <span>——————&nbsp;&nbsp;</span>登录账户<span>&nbsp;&nbsp;——————</span>
        </div>
        <div class="loginForm">
          <el-form label-position="left" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
              <el-input type="password" v-model="ruleForm.passWord" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass"></el-input>
            </el-form-item>
            <el-form-item class="btnGroup">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">立即注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    //表单验证规则
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.passWord) {
          console.log(this.ruleForm)
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        userName: '',
        passWord: '',
        checkPass: ''
      },
      rules: {
        userName: [{ validator: checkUser, trigger: 'blur' }],
        passWord: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      
    }
  }
}
</script>

<style lang="scss">
.home {
  .main {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    opacity: 0.5;
    background: url(../../assets/img/back.jpg);
    background-color: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    background-position: 50% 50%;
    background-size: cover;
  }
  .outScroll {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    opacity: 1;
    overflow-y: auto;
    .mainContainer {
      display: block;
      width: 350px;
      height: 450px;
      margin: 100px auto 100px;
      padding: 5px;
      cursor: pointer;
      z-index: 3;
      color: black;
      background-color: white;
      /* border: 2px solid goldenrod; */
      border-radius: 15px;
      background-position: 0 -115px;
      .header {
        margin: 20px;
        display: flex;
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
        justify-content: center;
      }
      .loginTitle {
        text-align: center;
        span {
          color: darkgray;
        }
      }
      .loginForm {
        margin: 40px 20px;
      }
      .el-form-item__label{
          font-size: 1rem;
      }
      .btnGroup{
          .el-form-item__content{
              margin-left: 0 !important;
              .el-button{
                  width: 100%;
                  margin-left: 0;
                  margin-bottom: 20px;
              }
          }
      }
    }
  }
}
</style>
