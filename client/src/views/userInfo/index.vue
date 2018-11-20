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
              <el-upload
              ref="upload"
              list-type="picture-card"
              action="http://192.168.31.16:3333/user/uploadHeadImg"
              name="uploadFile"
              :show-file-list="false" 
              :headers="header"
              :on-success="handleSuccess"
              :before-upload="beforeUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <div v-else>
                  <img src="../../assets/img/headerDefault.jpg">
                </div>
                <el-button size="mini" class="changeImg" type="primary" icon="el-icon-edit" circle></el-button>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottomContent">
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
                      <el-input type="text" :maxlength="8" v-model="infoForm.username"></el-input>
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
            <el-tab-pane label="订单历史" name="searchHistory">
              <h1>订单历史</h1>
              <div v-if="isNoOrder" class="noOrderContainer">
                <p class="p1">没有找到搜索历史</p>
                <p class="p2">现在就开始搜索！</p>
                <p>
                  <router-link class="a1" to="/">搜索机票</router-link>
                  <router-link class="a1" to="/hotel">搜索酒店</router-link>
                  <router-link class="a1" to="/car">搜索租车</router-link>
                </p>
              </div>
              <div v-else class="haveOrderContainer">
                <div class="orderSelect">
                  <span>订单类型：</span>
                  <el-select v-model="value" placeholder="请选择订单类型">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <div @click="delAllOrder" class="delOrder">
                    删除所有历史订单
                  </div>
                </div>
                <div class="orderDetail" v-for="order in allOrderList" :key="order._id">
                  <el-row>
                    <el-col :span="1">
                      <div class="icon">
                        <img src="../../assets/img/planeOrder.png">
                      </div>
                    </el-col>
                    <el-col :span="2">
                      <div class="place divHeight">
                        {{order.planeId}}
                      </div>
                    </el-col>
                    <el-col :span="3">
                      <div class="place divHeight">
                        {{order.flightName}}
                      </div>
                    </el-col>
                    <el-col :span="3">
                      <div class="place divHeight">
                        {{order.startCity}} - {{order.endCity}}
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="divHeight">
                        {{order.startTime}} &nbsp;-&nbsp; {{order.endTime}}
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="divHeight">
                        {{order.siteType}} &nbsp; ￥{{order.checkPrice}}
                      </div>
                    </el-col>
                    <el-col :span="3">
                      <div class="toIcon divHeight">
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="更多信息" name="moreInfo">更多信息</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <footerComponent></footerComponent>
  </div>
</template>

<script>
import headerComponent from '../../components/header'
import footerComponent from '../../components/footer'
import { VueCropper } from 'vue-cropper'
import { changeInfo,uploadHeadImg } from '../../api/user/modifiInfo.js'
import { queryAllOrder, deleteAllOrder } from '../../api/order/orderInfo.js'
export default {
  name: 'userInfo',
  components: { headerComponent, footerComponent, VueCropper },
  data() {
    var validatePass = (rule, value, callback) => {
      let regx = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
      if (value === '') {
        callback(new Error('请输入账户密码'))
      } else if (value.length < 3) {
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
      }
      if (value.length < 18) {
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
      isNoOrder: true, //是否无订单存在
      infoForm: {
        username: '',
        userpass: '',
        userphone: '',
        usercard: '',
        useraddress: ''
      },
      imageUrl: '',
      userHeadImg: '',
      options: [
        {
          value: 'all',
          label: '所有历史订单'
        },
        {
          value: 'plane',
          label: '机票历史订单'
        },
        {
          value: 'hotel',
          label: '酒店历史订单'
        },
        {
          value: 'car',
          label: '租车历史订单'
        }
      ],
      value: '所有历史订单',
      rule: {
        username: [{ validator: validate1, trigger: 'change' }],
        userpass: [{ validator: validatePass, trigger: 'change' }],
        usercard: [{ validator: validate3, trigger: 'change' }],
        useraddress: [{ validator: validate4, trigger: 'change' }]
      },
      allOrderList: []
    }
  },
  computed: {
    userInfo: function() {
      return this.$store.getters.userInfo
    },
    userphone: function() {
      return this.$store.getters.userphone
    },
    header(){
      const tk = { "_TK":this.$store.getters.token}
      return tk
    }
  },
  created() {
    this.activeName = this.$route.params.tab
    this.getAllOrder()
  },
  methods: {
    handleClick(tab) {
      console.log(this.$store.state)
    },
    hanleChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.infoForm.userphone = this.userphone
          this.$store.dispatch('ChangeByUserPhone', this.infoForm).then(err => {
            this.$message.success('账户信息设置成功!')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getAllOrder() {
      let params = {
        userphone: localStorage.getItem('userphone')
      }
      queryAllOrder(params).then(res => {
        if (res.data.code == 200) {
          this.allOrderList = res.data.body
          this.isNoOrder = this.allOrderList.length == 0 ? true : false
        } else {
        }
      })
    },
    delAllOrder() {
      this.$confirm('确认删除所有历史订单 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let params = {
            userphone: localStorage.getItem('userphone')
          }
          deleteAllOrder(params).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: res.data.message
              })
              this.getAllOrder()
            } else {
              this.$message({
                type: 'warning',
                message: res.data.message
              })
            }
          })
        })
        .catch(() => {})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleUpload(req){
      //file就是当前准备上传的文件
      let fileObj = req.file;
      //生成新的formdata对象
      let form = new FormData();
      //文件对象，key是后台接受的参数名称
      form.append("uploadFile",fileObj);

      console.log(form)
      uploadHeadImg(form).then((res) => {

      })

    },
    handleSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
            .el-upload--picture-card{
              width: 150px;
              height: 150px;
              display: inline-block;
              float: left;
              border-radius: 50%;
              border: none;
            }
            .el-upload--picture-card i {
                font-size: 28px;
                color: #fff;
            }
            .changeImg {
              position: absolute;
              margin: 114px 0 0 -30px;
            }
            .el-button--mini.is-circle {
                padding: 4px;
            }
          }
        }
      }
    }
  }
  .bottomContent {
    padding-bottom: 275px;
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
        .noOrderContainer {
          height: 150px;
          padding: 30px;
          border: 1px solid #dae0e4;
          text-align: center;
          color: #000;
          .p1 {
            font-size: 20px;
            font-weight: 600;
          }
          .p2 {
            color: #6d8494;
            font-size: 16px;
            font-weight: 500;
          }
          .a1 {
            cursor: pointer;
            color: #1e93f5;
            text-decoration: none;
            outline: none;
            padding-left: 20px;
          }
          .a1:hover {
            text-decoration: underline;
          }
        }
        .haveOrderContainer {
          padding-bottom: 60px;
          .orderSelect {
            height: 40px;
            line-height: 40px;
            margin-bottom: 30px;
            .delOrder {
              cursor: pointer;
              float: right;
              color: #1e93f5;
            }
          }
          .orderDetail {
            height: 68px;
            padding: 10px 50px;
            border: 1px solid #dae0e4;
            margin-bottom: 20px;
            .divHeight {
              text-align: center;
              height: 68px;
              line-height: 68px;
            }
            .icon {
              padding: 20px 0;
            }
            .place {
              font-weight: 600;
              color: #17232c;
            }
            .toIcon {
              .el-icon-arrow-right {
                color: #4494f5;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>

