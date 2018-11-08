<template>
  <div class="home">
    <div class="main"></div>
    <div class="outScroll">
      <div class="mainContainer">
        <div class="header">
          <img src="../../assets/img/bird.png">
          <span>&nbsp;草鹨旅行网</span>
        </div>
        <div class="loginTitle" v-show="isLogin">
          <span>——————&nbsp;&nbsp;</span>登录账户<span>&nbsp;&nbsp;——————</span>
        </div>
        <div class="loginTitle" v-show="!isLogin">
          <span>——————&nbsp;&nbsp;</span>注册账户<span>&nbsp;&nbsp;——————</span>
        </div>
        <div class="loginForm" v-show="isLogin">
          <el-form label-position="left" :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="userphone">
              <el-input v-model="loginForm.userphone" :maxlength="11" placeholder="UserPhone"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="PassWord"></el-input>
            </el-form-item>
            <el-form-item class="btnGroup">
              <el-button type="primary" @click="handleLogin">登录</el-button>
              <el-button @click="toRegister">立即注册</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="loginForm" v-show="!isLogin">
          <el-form label-position="left" :model="registerForm" status-icon :rules="regisRule" ref="registerForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="userphone">
              <el-input v-model="registerForm.userphone" :maxlength="11" placeholder="UserPhone"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="registerForm.password" placeholder="PassWord" ></el-input>
            </el-form-item>
            <el-form-item prop="checkpass">
              <el-input type="password" v-model="registerForm.checkpass" placeholder="ConfirmPassWord" ></el-input>
            </el-form-item>
            <el-form-item class="btnGroup">
              <el-button type="primary" @click="handleRegister">注册</el-button>
              <el-button @click="toLogin">返回登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    //表单验证规则
    var checkUser = (rule, value, callback) => {
      let regx = /^[0-9]+$/
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      if (!regx.test(value)) {
        callback(new Error('手机号码只能包含数字'))
      }  else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isLogin: true,
      loginForm: {
        userphone: null,
        password: ''
      },
      registerForm: {
        userphone: null,
        password: '',
        checkpass: ''
      },
      rules: {
        userphone: [{ validator: checkUser, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }]
      },
      regisRule: {
        userphone: [{ validator: checkUser, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],
        checkpass: [{ validator: validatePass2, trigger: 'change' }]
      }
    }
  },

  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('LoginByUserPhone', this.loginForm)
            .then(() => {
              console.log("登陆成功")
              this.loading = false
              this.$message.success('登录成功!')
              this.$router.push({
                path: '/'
              })
            })
            .catch(e => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister(){
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('RegisterByUserPhone', this.registerForm)
            .then(() => {
              this.$message.success('注册成功!')
              this.loading = false
            })
            .catch(e => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toRegister() {
      this.isLogin = false
    },
    toLogin(){
      this.isLogin = true
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
    background: url(../../assets/img/loginBack2.jpg);
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
      height: 400px;
      margin: 10% auto 100px;
      padding: 5px;
      cursor: pointer;
      z-index: 3;
      color: #fff;
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
      .el-form-item {
          padding: 0 14px;
          margin-bottom: 30px;
      }
      .el-form-item__content{
          margin-left: 0px !important;
          width: 280px;
          height: 60px;
      }
      .el-input__inner{
          font-size: 1.5rem;
          height: 55px;
          font-weight: 500;
          background-color: #fff;
          opacity: 0.4;
          color: #000;
      }
      .el-form-item__error{
        color: #fff;
        font-size: 13px;
      }
      .el-form-item.is-error .el-input__validateIcon {
          color: #FED;
      }
      .btnGroup{
          .el-form-item__content{
              margin-left: 0 !important;
              .el-button{
                  width: 100%;
                  margin-left: 0;
                  height: 46px;
                  margin-bottom: 30px;
              }
          }
      }
    }
  }
}
</style>
