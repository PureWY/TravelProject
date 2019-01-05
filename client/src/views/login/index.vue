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
              <el-input v-model="loginForm.userphone" :maxlength="11" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
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
              <el-input v-model="registerForm.userphone" :maxlength="11" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" :maxlength="8" v-model="registerForm.password" placeholder="请输入密码" ></el-input>
            </el-form-item>
            <el-form-item prop="checkpass">
              <el-input type="password" :maxlength="8" v-model="registerForm.checkpass" placeholder="请确认密码" ></el-input>
            </el-form-item>
            <el-form-item class="codeForm">
              <el-input :maxlength="6" class="codeInput" v-model="checkcode" placeholder="请输入验证码" ></el-input>
              <el-button class="codeBtn" v-if="!haveCode" @click="getAuthCode" type="success">获取验证码</el-button>
              <el-button class="codeBtn" v-if="haveCode" type="success">{{second}} S</el-button>
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
import axios from 'axios'
export default {
  name: 'login',
  data() {
    //表单验证规则
    var checkUser = (rule, value, callback) => {
      let regx = /^[0-9]+$/
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else if (value.length != 11) {
        callback(new Error('手机号码必须等于11位'))
      }
      if (!regx.test(value)) {
        callback(new Error('手机号码只能包含数字'))
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
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      haveCode: false,
      isLogin: true,
      loginForm: {
        userphone: '',
        password: ''
      },
      registerForm: {
        userphone: '',
        password: '',
        checkpass: '',
      },
      rules: {
        userphone: [{ validator: checkUser, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }]
      },
      regisRule: {
        userphone: [{ validator: checkUser, trigger: 'change' }],
        password: [{ validator: validatePass, trigger: 'change' }],
        checkpass: [{ validator: validatePass2, trigger: 'blur' }],
      },
      checkcode: '',
      second: 10,
      randomCode: ''
    }
  },
  created () {
    this.loginForm = {
      userphone: '',
      password: ''
    }
    this.registerForm = {
      userphone: '',
      password: '',
      checkpass: ''
    }
    if(this.$route.params.phone){
      this.isLogin = false;
      this.registerForm.userphone = this.$route.params.phone
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
            if(!this.checkcode){
            this.$message.warning('请获取验证码！')
            return
          }else if(this.checkcode != this.randomCode){
            this.$message.warning('验证码错误！')
            return
          }else{
            this.loading = true
            this.$store
              .dispatch('RegisterByUserPhone', this.registerForm)
              .then(() => {
                this.$message.success('注册成功!')
                // this.$refs['registerForm'].resetFields()
                this.loading = false
              })
              .catch(e => {
                this.loading = false
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getAuthCode(){
      if(!this.registerForm.userphone){
        this.$message.warning('请填写手机号码!')
      }else{
        this.haveCode = !this.haveCode
        let getCode = setInterval(() => {
          if(this.second == 1){
            this.haveCode = !this.haveCode
            this.second = 10
            clearInterval(getCode)
          }
          this.second--
        },1000)
        this.randomCode = (Math.random() + '0').substring(2,8)
        console.log(this.randomCode)

        let url = '/authCode'
        let data = {
            mobile: this.registerForm.userphone,
            tpl_id: 125504,
            tpl_value: '#app#=草鹨旅行网&#code#=' + this.randomCode,
            key: 'be9597def9ecf3dc72a9473459572100'
        }
        axios({
            method: 'get',
            url: url,
            params: data
        }).then((res) => {
            if(res.data.reason =='操作成功'){
                this.$message.success('验证码已发送!')
            }
        })
      }
    },
    toRegister() {
      this.$refs['registerForm'].resetFields()
      this.isLogin = false
    },
    toLogin(){
      this.$refs['loginForm'].resetFields()
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
    background: url(../../assets/img/back.jpg);
    opacity: 0.5;
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
      margin: 8% auto 100px;
      padding: 5px;
      cursor: pointer;
      z-index: 3;
      color: black;
      background-color: white;
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
        .codeForm{
          .el-form-item__content{
              display: flex;
            .codeInput{
              width: 54%;
              .el-input__inner{
                width: 97%;
              }
            }
            .codeBtn{
              padding: 12px 7px;
              width: 31%;
            }
          }
        }
      }
      .el-form-item {
          padding: 0 14px;
          margin-bottom: 0px;
      }
      .el-form-item__content{
          margin-left: 20px !important;
          width: 280px;
          height: 40px;
          margin-bottom: 25px;
      }
      .el-input__inner{
          font-size: 1.2rem;
          height: 40px;
          line-height: 40px;
          font-weight: 400;
          background-color: #fff;
          color: #000;
          width: 85%;
          border: 1px solid #DCDFE5;
      }
      .el-input__inner::-webkit-input-placeholder{
          font-size: 0.9rem
      }
      .btnGroup{
          .el-form-item__content{
              margin-left: 20 !important;
              .el-button{
                  width: 85%;
                  margin-left: 0;
                  height: 40px;
                  margin-bottom: 25px;
              }
          }
      }
    }
  }
}
</style>
