<template>
  <div class="userInfo">
    <headerComponent></headerComponent>
    <div class="divideLine"></div>
    <div class="infoContainer">
      <div class="infoContent">
        <div class="infoText">
          <div class="infoIntroduce">
            <h2>欢迎回来</h2>
            <div class="infoDetails">
              <div class="detailLeft">
                <p>账户名称</p>
                <span>{{userInfo.username}}</span>
              </div>
              <div class="detailRight">
                <p>个性签名</p>
                <span>他想知道她是谁，为何总沉默寡言</span>&nbsp;&nbsp;
                <el-button size="mini" round>修改</el-button>
              </div>
            </div>
          </div>
          <div class="infoHeaderImg">
            <div class="headerImage">
              <img src="../../assets/img/headerDefault.jpg">
              <el-button class="changeImg" type="warning" icon="el-icon-edit" circle></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="infoTab">
      <div class="tabContent">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="账户信息" name="accountInfo">
            <h1>账户信息</h1>
            <div class="accountTable">
              <div class="accountLeft">
                <p>账户名称</p>
                <span v-if="userInfo.username">{{userInfo.username}}</span>
                <span v-else>还未设置名称，快去设置一个吧</span>
                <p>手机号码</p>
                <span>{{userphone}}</span>
                <p>身份证号</p>
                <span v-if="userInfo.usercard">{{userInfo.usercard}}</span>
                <span v-else>还未填写身份信息，快去填写吧</span>
                <p>居住地址</p>
                <span v-if="userInfo.useraddress">{{userInfo.useraddress}}</span>
                <span v-else>还未填写居住信息，快去填写吧</span>
              </div>
              <div class="accountRight">

              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="账户设置" name="accountSet">
            <h1>账户设置</h1>
            <div class="accountTable">
              <div class="accountLeft">
                <el-form :model="infoForm" status-icon :rules="rule" label-position="left" ref="ruleForm" label-width="100px">
                  <el-form-item label="手机号码" prop="userphone">
                    <el-input type="text" disabled :maxlength="11" v-model="userphone"></el-input>
                  </el-form-item>
                  <el-form-item label="账户名称" prop="username">
                    <el-input type="text" v-model="infoForm.username"></el-input>
                  </el-form-item>
                  <el-form-item label="账户密码" prop="userpass">
                    <el-input type="password" :maxlength="8" v-model="infoForm.userpass"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号" prop="usercard">
                    <el-input type="text" :maxlength="18" v-model="infoForm.usercard"></el-input>
                  </el-form-item>
                  <el-form-item label="居住地址" prop="useraddress">
                    <el-input type="text" :maxlength="50" v-model="infoForm.useraddress"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="hanleChange('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="accountRightTwo">

              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="搜索历史" name="searchHistory">搜索历史</el-tab-pane>
          <el-tab-pane label="更多信息" name="moreInfo">更多信息</el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <footerComponent></footerComponent>
  </div>
</template>

<script>
import headerComponent from '../../components/header'
import footerComponent from '../../components/footer'
import {
  changeInfo
} from '../../api/user/modifiInfo.js'
export default {
  name: 'userInfo',
  components: { headerComponent, footerComponent },
  data() {
    var validatePass = (rule, value, callback) => {
      let regx = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
      if (value === '') {
        callback(new Error('请输入账户密码'))
      } else if(value.length < 3){
        callback(new Error('账户密码必须大于3位'))
      } else if (!regx.test(value)) {
        callback(new Error('账户密码只能包含数字或字母或中文'))
      } else {
        callback()
      }
    }
    var validate1 = (rule, value, callback) => {
      let regx = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
      if (value === '') {
        callback(new Error('请输入账户名称'))
      }
      if (!regx.test(value)) {
        callback(new Error('账户名称只能包含数字或字母或中文'))
      } else {
        callback()
      }
    }
    var validate2 = (rule, value, callback) => {
      let regx = /^[0-9]+$/
      if (value === '') {
        callback(new Error('请输入手机号码'))
      }
      if (!regx.test(value)) {
        callback(new Error('手机号码只能包含数字'))
      } else {
        callback()
      }
    }
    var validate3 = (rule, value, callback) => {
      let regx = /^([0-9]{18})|([0-9]{17}[X]{1})/
      if (value === '') {
        callback(new Error('请输入身份证号'))
      }if(value.length < 18){
        callback(new Error('身份证号必须等于18位'))
      } else if (!regx.test(value)) {
        callback(new Error('身份证号只允许最后一位为X'))
      } else {
        callback()
      }
    }
    var validate4 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入居住地址'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'accountInfo',
      infoForm: {
        username: '',
        userpass: '',
        userphone: '',
        usercard: '',
        useraddress: ''
      },
      rule: {
        username: [{ validator: validate1, trigger: 'change' }],
        userpass: [{ validator: validatePass, trigger: 'change' }],
        usercard: [{ validator: validate3, trigger: 'change' }],
        useraddress: [{ validator: validate4, trigger: 'change' }]
      }
    }
  },
  computed: {
    userInfo: function(){
      return this.$store.getters.userInfo;
    },
    userphone: function(){
      return this.$store.getters.userphone;
    }
  },
  created() {
    console.log(this.$store.state.user)
  },
  methods: {
    handleClick(tab) {
      console.log(this.$store.state.user)
    },
    hanleChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.infoForm.userphone = this.userphone
          this.$store.dispatch('ChangeByUserPhone',this.infoForm)
          .then((err) => {
            this.$message.success('账户信息设置成功!')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
.userInfo {
  .divideLine {
    width: 100%;
    height: 3px;
    background-color: #ea4a1a;
    margin-top: -3px;
  }
  .infoContainer {
    width: 100%;
    height: 240px;
    background-color: #f5f5f5;
    .infoContent {
      height: 240px;
      max-width: 70em;
      margin: 0 auto;
      .infoText {
        height: 170px;
        padding: 35px 0;
        .infoIntroduce {
          width: 70%;
          height: 100%;
          float: left;
          h2 {
            margin: 0 0 20px 0;
            font-size: 50px;
            line-height: normal;
            font-weight: 600;
          }
          .infoDetails {
            width: 80%;
            height: 50px;
            .detailLeft {
              float: left;
              width: 30%;
              height: 50px;
              p {
                margin: 0;
                font-size: 0.8rem;
              }
              span {
                display: flex;
                height: 32px;
                align-items: center;
                font-weight: 600;
                font-size: 1rem;
              }
            }
            .detailRight {
              float: left;
              width: 70%;
              height: 50px;
              p {
                margin: 0;
                font-size: 0.8rem;
              }
              span {
                font-weight: 600;
                font-size: 1rem;
              }
            }
          }
        }
        .infoHeaderImg {
          width: 30%;
          height: 100%;
          float: right;
          .headerImage {
            width: 150px;
            height: 150px;
            padding: 10px;
            float: right;
            img {
              width: 150px;
              height: 150px;
              display: inline-block;
              float: left;
              border-radius: 50%;
            }
            .changeImg {
              position: absolute;
              margin: 110px 0 0 -30px;
            }
          }
        }
      }
    }
  }

  .infoTab {
    max-width: 70em;
    margin: 0 auto 70px;
    .tabContent {
      padding-top: 50px;
      .el-tabs__item {
        font-size: 17px;
      }
      .accountTable {
        height: 347px;
        padding: 30px;
        border: 1px solid #dae0e4;
        .accountLeft {
          width: 30%;
          float: left;
          p {
            font-size: 1.1rem;
            font-weight: 700;
          }
          span {
            padding-bottom: 15px;
          }
        }
        .accountRight {
          width: 60%;
          height: 347px;
          float: right;
          background-image: url(../../assets/img/desk2.jpg);
          background-size: cover;
        }
        .accountRightTwo {
          width: 60%;
          height: 347px;
          float: right;
          background-image: url(../../assets/img/desk1.jpg);
          background-size: cover;
        }
      }
    }
  }
}
</style>

