<template>
  <div class="flightPay">
    <div class="titleContent">
      <div class="listTitle">
        <div class="titleStyle">
          <h2 class="title">更优质的售后服务</h2>
        </div>
      </div>
    </div>
    <div class="orderContainer">
      <div class="orderContent">
        <div class="flightTitle">
          订单信息
        </div>
        <div class="flightInfo">
          <el-row>
            <el-col :span="2">
              <div class="flightIcon">
                <img src="../../../assets/img/order.png">
              </div>
            </el-col>
            <el-col :span="4">
              <div class="flightNo">
                {{orderInfo.flightName}}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="flightTime">
                <div v-if="orderInfo.startDate == orderInfo.endDate">
                  {{orderInfo.startDate}}
                </div>
                <div v-else>
                  {{orderInfo.startDate}} - {{orderInfo.startDate}}
                </div>
                <div>
                  {{orderInfo.startHourTime}} - {{orderInfo.endHourTime}}
                </div>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="flightCity">
                {{orderInfo.startCity}} －＞ {{orderInfo.endCity}}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="flightSite">
                舱位：{{orderInfo.planeInfo.siteType[0]}}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="flightPrice">
                ￥ {{orderInfo.planeInfo.checkPrice}}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div class="userContainer">
      <div class="userContent">
        <div class="userTitle">
          乘机人信息
        </div>
        <div class="userForm">
          <el-form :inline="true" :rules="rule" ref="orderForm" :model="orderForm" label-width="80px">
            <el-form-item label="姓名:" prop="username">
              <el-input v-model="orderForm.username" :maxlength="4" placeholder="请输入乘机人姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号:" prop="usercard">
              <el-input v-model="orderForm.usercard" :maxlength="18" placeholder="请输入身份证号"></el-input>
            </el-form-item>
            <el-form-item label="联系方式:" prop="userphone">
              <el-input v-model="orderForm.userphone" :maxlength="11" placeholder="请输入联系方式"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="subOrderBtn" type="warning" @click="submitOrder">提交订单</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTime, getDetailTime, getDate } from '../../../utils/func.js'
import { subFlightOrder } from '../../../api/plane/index.js'
export default {
  name: 'flightPay',
  data() {
    var validate1 = (rule, value, callback) => {
      let regx = /^[\u4e00-\u9fa5]+$/
      if (value === '') {
        callback(new Error('请输入乘机人姓名'))
      }
      if (!regx.test(value)) {
        callback(new Error('姓名只能包含中文'))
      } else {
        callback()
      }
    }
    var validate2 = (rule, value, callback) => {
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
    return {
      orderInfo: {},
      orderForm: {
        username: '',
        usercard: '',
        userphone: ''
      },
      rule: {
        username: [{ validator: validate1, trigger: 'change' }],
        usercard: [{ validator: validate3, trigger: 'change' }],
        userphone: [{ validator: validate2, trigger: 'change' }]
      },
      orderListQuery: {}
    }
  },
  created() {
    this.orderInfo = JSON.parse(localStorage.getItem('orderInfo'))
    console.log(this.orderInfo)
    this.orderInfo.startDate = getDate(this.orderInfo.startTime)
    this.orderInfo.endDate = getDate(this.orderInfo.endTime)
  },
  methods: {
    submitOrder() {
      this.$refs['orderForm'].validate(valid => {
        if (valid) {
          let siteEngType = ''
          switch(this.orderInfo.planeInfo.siteType[0]){
            case '经济舱':
              siteEngType = 'firstClassSite'
              break;
            case '商务舱':
              siteEngType = 'secondClassSite'
              break;
            case '头等舱':
              siteEngType = 'thirdClassSite'
              break;
          }
          console.log(siteEngType)
          this.orderListQuery = {
            ...this.orderForm,
            startCity: this.orderInfo.startCity,
            endCity: this.orderInfo.endCity,
            startTime: this.orderInfo.startTime,
            endTime: this.orderInfo.endTime,
            flightName: this.orderInfo.flightName,
            planeId: this.orderInfo.planeId,
            siteType: this.orderInfo.planeInfo.siteType[0],
            siteEngType: siteEngType,
            checkPrice: this.orderInfo.planeInfo.checkPrice
          }
          subFlightOrder(this.orderListQuery).then(res => {
            if (res.data.code == 200) {
              this.$confirm('购票成功', '提示', {
                confirmButtonText: '确定',
                type: 'success'
              })
                .then(() => {
                  this.$nextTick(() => {
                    this.$refs['orderForm'].resetFields()
                  })
                })
                .catch(() => {
                })
            } else {
              this.$message.error(res.data.message)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.flightPay {
  background-color: #f5f5f5;
  padding-bottom: 275px;
  .titleContent {
    margin-top: -3px;
    background-color: #e9451a;
    .listTitle {
      margin: 0 auto;
      max-width: 70em;
      height: 81px;
      .titleStyle {
        display: flex;
        align-items: flex-end;
        .title {
          font-family: 'Forza-Black', Helvetica, Arial, sans-serif;
          font-weight: 800;
          text-align: left;
          color: #fff;
          font-size: 38px;
          margin: 20px 0 0;
        }
      }
    }
  }
  .orderContainer {
    padding: 30px 0;
    .orderContent {
      max-width: 70em;
      margin: 0 auto;
      .flightTitle {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-weight: 500;
        font-size: 1.1rem;
      }
      .flightInfo {
        height: 90px;
        padding: 30px 60px;
        background-color: #fff;
        border: 1px solid #d9e1e8;
        .el-row {
          .el-col {
            height: 90px;
            line-height: 90px;
            .flightIcon {
              text-align: center;
              height: 50px;
              padding: 20px 0;
            }
            .flightNo {
              text-align: center;
              font-size: 1.1rem;
              font-weight: 600;
            }
            .flightTime {
              padding: 15px 0;
              div {
                text-align: center;
                font-size: 1rem;
                font-size: 500;
                height: 30px;
                line-height: 30px;
              }
            }
            .flightCity {
              text-align: center;
              font-size: 1.1rem;
              font-weight: 500;
            }
            .flightSite {
              text-align: center;
              font-size: 1.1rem;
              font-weight: 500;
            }
            .flightPrice {
              text-align: center;
              font-size: 1.5rem;
              color: #e9451a;
            }
          }
        }
      }
    }
  }
  .userContainer {
    padding: 0 0 30px 0;
    .userContent {
      max-width: 70em;
      margin: 0 auto;
      .userTitle {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-weight: 500;
        font-size: 1.1rem;
      }
      .userForm {
        height: 60px;
        padding: 55px 40px 35px;
        background-color: #fff;
        border: 1px solid #d9e1e8;
        .subOrderBtn {
          margin-left: 20px;
          background-color: #e9451a;
          border-color: #e9451a;
        }
        .subOrderBtn:hover {
          background: #c13111;
          border-color: #c13111;
        }
      }
    }
  }
}
</style>
