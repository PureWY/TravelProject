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
            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="btnGroup">
              <el-button type="primary" @click="handleLogin">登录</el-button>
              <el-button @click="toRegister">立即注册</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="loginForm" v-show="!isLogin">
          <el-form label-position="left" :model="registerForm" status-icon :rules="regisRule" ref="registerForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="registerForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpass">
              <el-input type="password" v-model="registerForm.checkpass"></el-input>
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
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
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
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        checkpass: ''
      },
      rules: {
        username: [{ validator: checkUser, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }]
      },
      regisRule: {
        username: [{ validator: checkUser, trigger: 'change' }],
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
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              console.log("登陆成功")
              this.loading = false
              this.$message.success('登录成功!')
              this.$router.push({
                path: '/main'
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
            .dispatch('RegisterByUsername', this.registerForm)
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
