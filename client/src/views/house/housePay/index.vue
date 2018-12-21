<template>
    <div class="housePay">
        <div class="titleContent">
            <div class="listTitle">
                <div class="titleStyle">
                <h2 class="title">更优质的售后服务</h2>
                </div>
            </div>
        </div>
        <div class="payContainer">
            <div class="payContent">
                <div>
                    <h3>订单信息</h3>
                </div>
                <div class="payConfirm">
                    <div class="orderDetail">
                        <div class="orderImg">
                            <img :src= roomInfo.img />
                        </div>
                        <div class="hotelInfo">
                            <p>{{orderInfo.houseName}}</p>
                            <span>{{orderInfo.houseDetailPlace}}</span>
                            <p class="grade">{{orderInfo.houseGrade}}</p>
                        </div>
                        <div class="roomDetail">
                            <ul>
                                <li>
                                    <span>房型:</span> {{roomInfo.name}}
                                </li>
                                <li>
                                    <span>床型:</span> {{roomInfo.bed}}
                                </li>
                                <li v-for="ser in roomInfo.service" :key="ser">
                                    <span>{{ser}}:</span> {{ser}}
                                </li>
                                <li>
                                    <span>客服电话:</span> {{orderInfo.housePhone}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="userInfo">
                        <div class="siteNotice">
                            在草鹨旅行网订房的旅客均可享受下单立减20元优惠
                        </div>
                        <p>预订信息</p>
                        <div class="orderDetailInfo">
                            <div class="dlStyle">
                                <dl>
                                    <dt>入离店日期：</dt>
                                    <dd class="date"><el-date-picker
                                        size="mini"
                                        v-model="orderForm.time"
                                        type="daterange"
                                        :clearable="false"
                                        value-format="yyyy-MM-dd"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                        </el-date-picker>
                                    </dd>
                                    <dd>共 {{allTime}} 晚</dd>
                                </dl>
                            </div>
                            <div class="dlStyle">
                                <dl>
                                    <dt>房间数量：</dt>
                                    <dd class="date">
                                        <el-input-number :min="1" size="mini" v-model="orderForm.allAmount"></el-input-number>
                                    </dd>
                                </dl>
                            </div>
                            <div class="dlStyle">
                                <dl>
                                    <dt>房费总计：</dt>
                                    <dd class="date">
                                        <span class="allPrice">￥{{allPrice}}</span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <p>入住信息</p>
                        <div class="userDetailInfo">
                            <el-form label-position="left" :model="orderForm" status-icon :rules="orderFormRule" ref="orderForm" label-width="100px">
                            <el-form-item label="姓名" prop="username">
                                <el-input size="mini" :maxlength="4" v-model="orderForm.username"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式" prop="userphone">
                                <el-input size="mini" :maxlength="11" v-model="orderForm.userphone"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号" prop="usercard">
                                <el-input size="mini" :maxlength="18" v-model="orderForm.usercard"></el-input>
                            </el-form-item>
                            </el-form>
                        </div>
                        <p class="fapiao">如需发票，请从酒店前台索取</p>
                        <div class="confirmBtn">
                            <el-button @click="confirmOrder" >提交订单</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
var moment = require('moment');
import {
    subHouseOrder,
    queryHotelByRoomId
} from '../../../api/hotel/index.js'

export default {
    name: 'housePay',
    data(){
        var validate1 = (rule, value, callback) => {
      let regx = /^[\u4e00-\u9fa5]+$/
      if (value === '') {
        callback(new Error('请输入预订人姓名'))
      }
      if (!regx.test(value)) {
        callback(new Error('姓名只能包含中文'))
      } else {
        callback()
      }
    }
        var validate2 = (rule, value, callback) => {
        let regx = /^[0-9]{11}/
        if (value === '') {
            callback(new Error('请输入联系方式'))
        }
        if (!regx.test(value)) {
            callback(new Error('请输入正确的联系方式'))
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
            url: "http://192.168.1.103:3333/",
            roomId: '',
            roomInfo: {},
            orderInfo: {},
            input: '',
            orderForm: {
                roomId: '',
                engName: '',
                time: [],
                allAmount: 1,
                username: '',
                userphone: '',
                usercard: ''
            },
            orderFormRule: {
                username: [
                    { validator: validate1, trigger: 'change' }
                ],
                userphone: [
                    { validator: validate2, trigger: 'change' }
                ],
                usercard: [
                    { validator: validate3, trigger: 'change' }
                ]
            }
        }
    },
    created() {
        this.roomId = sessionStorage.getItem('roomId')
        this.roomName = sessionStorage.getItem('roomName')
        this.setInitTime()
        this.getOrderInfo()
    },
    computed: {
      allTime(){
          return moment(this.orderForm.time[1]).diff(moment(this.orderForm.time[0]),'days')
      },
      allPrice(){
          return this.allTime * this.orderForm.allAmount * this.roomInfo.price
      }  
    },
    methods: {
        setInitTime() {
            this.orderForm.time[1] = moment().format('YYYY-MM-DD')
            this.orderForm.time[0] = moment().subtract(1,'days').format('YYYY-MM-DD')
        },
        getOrderInfo(){
            queryHotelByRoomId({ roomId: this.roomId }).then((res) => {
                if(res.data.code == 200){
                  this.orderInfo = res.data.body[0]
                  this.orderInfo.roomInfo = this.orderInfo.roomInfo[0]
                  this.roomInfo = this.orderInfo.roomInfo[this.roomName][0]
                  this.roomInfo.img = this.url + this.roomInfo.img
                  this.orderForm.roomId = this.roomId
                  this.orderForm.engName = this.roomInfo.engName
              }
            })  
        },
        confirmOrder(){
            this.$refs.orderForm.validate(valid => {
                if (valid) {
                    this.orderForm.allTime = this.allTime
                    this.orderForm.allPrice = this.allPrice
                    subHouseOrder(this.orderForm).then(res => {
                        if (res.data.code == 200) {
                        this.$confirm('预订成功', '提示', {
                            confirmButtonText: '确定',
                            type: 'success'
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
.housePay{
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
  .payContainer{
      padding: 20px 0;
      .payContent{
          max-width: 70em;
          margin: 0 auto;
          .payConfirm{
              width: 100%;
              height: 600px;
              display: flex;
              .orderDetail{
                  width: 255px;
                  .orderImg{
                      height: 145px;
                      img{
                          width: 100%;
                          height: 100%;
                      }
                  }
                  .hotelInfo{
                      margin-top: 20px;
                      height: 100px;
                      border-bottom: 1px dashed #ccc;
                      p{
                          margin: 5px 0;
                      }
                      span{
                          font-size: 0.8rem;
                          color: gray;
                      }
                  }
                  .roomDetail{
                      margin-top: 20px;
                      height: 200px;
                      ul{
                          margin: 0;
                          padding: 0;
                          list-style: none;
                          li{
                              font-size: 0.9rem;
                              margin-bottom: 5px;
                              span{
                                  color: gray
                              }
                          }
                      }
                  }
              }
              .userInfo{
                  margin-left: 30px;
                  flex: 1;
                  .siteNotice{
                      height: 50px;
                      line-height: 50px;
                      background-color: #E9451A;
                      color: #fff;
                      font-size: 1.5rem;
                      font-weight: 500;
                      text-align: center;
                  }
                  .orderDetailInfo{
                      padding: 0px 30px 20px;
                      height: 120px;
                      border-bottom: 1px dashed #ccc; 
                      
                  }
                  .userDetailInfo{
                      padding: 0px 30px 20px;
                      height: 170px;
                      border-bottom: 1px dashed #ccc; 
                      .el-input{
                          width: 30%;
                      }
                  }
                  .fapiao{
                      margin: 10px 0;
                      font-size: 0.8rem;
                  }
                  .confirmBtn{
                      width: 100px;
                      height: 50px;
                      float: right;
                      margin-top: 10px;
                      .el-button{
                            border-radius: 0px;
                            background-color: #EC6916;
                            color: #fff;
                        }
                        .el-button:hover{
                            background-color: #E9451A;
                        }
                  }
              }
          }
      }
  }
  .dlStyle{
    height: 30px;
    dl{
    font-size: 0.9rem;
    dt{
        width: 90px;
        float: left;
    }
    dd{
        float: left;
        margin-left: 20px;
        .allPrice{
            color: #EB5456;
            font-size: 1.3rem;
            font-weight: 500;
        }
    }
    .date{
        margin-top: -4px;
    }
}
}
}
</style>

