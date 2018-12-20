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
                            <img src="../../../assets/img/single.png" />
                        </div>
                        <div class="hotelInfo">
                            <p>上海大酒店</p>
                            <span>江苏省南京市玄武区雨花门地铁站路口23号</span>
                            <p class="grade">4.7分</p>
                        </div>
                        <div class="roomDetail">
                            <ul>
                                <li>
                                    <span>房型:</span> 单人间
                                </li>
                                <li>
                                    <span>床型:</span> 单人床
                                </li>
                                <li>
                                    <span>网络:</span> 无线网络
                                </li>
                                <li>
                                    <span>早餐:</span> 有早
                                </li>
                                <li>
                                    <span>可住:</span> 1人
                                </li>
                                <li>
                                    <span>客服电话:</span> 0556-1234567
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
                                        v-model="value6"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                        </el-date-picker>
                                    </dd>
                                    <dd>共 1 晚</dd>
                                </dl>
                            </div>
                            <div class="dlStyle">
                                <dl>
                                    <dt>房间数量：</dt>
                                    <dd class="date">
                                        <el-input-number :min="1" size="mini" v-model="num7"></el-input-number>
                                    </dd>
                                </dl>
                            </div>
                            <div class="dlStyle">
                                <dl>
                                    <dt>房费总计：</dt>
                                    <dd class="date">
                                        <span class="allPrice">￥188</span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <p>入住信息</p>
                        <div class="userDetailInfo">
                            <div class="dlStyle">
                                <dl>
                                    <dt>姓名：</dt>
                                    <dd class="date">
                                        <el-input size="mini" v-model="input" placeholder="请输入姓名"></el-input>
                                    </dd>
                                </dl>
                            </div>
                            <div class="dlStyle">
                                <dl>
                                    <dt>联系电话：</dt>
                                    <dd class="date">
                                        <el-input size="mini" v-model="input" placeholder="请输入手机号码"></el-input>
                                    </dd>
                                </dl>
                            </div>
                            <div class="dlStyle">
                                <dl>
                                    <dt>身份证号：</dt>
                                    <dd class="date">
                                        <el-input size="mini" v-model="input" placeholder="请输入身份证号"></el-input>
                                    </dd>
                                </dl>
                            </div>
                            <div class="dlStyle">
                                <dl>
                                    <dt>安全验证：</dt>
                                    <dd class="date">
                                        <el-input size="mini" v-model="input" placeholder="请输入验证码"></el-input>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <p class="fapiao">如需发票，请从酒店前台索取</p>
                        <div class="confirmBtn">
                            <el-button >提交订单</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'housePay',
    data(){
        return {
            value6: '',
            num7: '',
            input: ''
        }
    },
    created() {
        console.log(sessionStorage.getItem('roomId'))
    },

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

