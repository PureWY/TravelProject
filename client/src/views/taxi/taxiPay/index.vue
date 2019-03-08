<template>
  <div class="taxiPay">
    <div class="titleContent">
      <div class="listTitle">
        <div class="titleStyle">
          <h2 class="title">更高效的出行方式</h2>
        </div>
      </div>
    </div>

    <div class="taxiContainer">
        <div class="taxiContent">
            <div class="carInfoContent">
                <el-row>
                  <el-col :span="12">
                      <div class="carInfo">
                          <div class="carImg">
                              <img src="../../../assets/img/troc.jpg" />
                          </div>
                          <div class="carName">
                              <h3>TRO-C 探歌</h3>
                              <div class="info">三厢/自动/1.5T</div>
                              <el-button size="medium" @click="dialogVisible = true" type="primary">查看配置信息</el-button>
                              <el-button size="medium">修改订单</el-button>
                          </div>
                      </div>
                  </el-col>
                  <el-col :span="12">
                      <div class="carPlace">
                          <el-row>
                            <el-col :span="12">
                                <div class="getCarPlace">
                                    <div class="icon">
                                        <img src="../../../assets/img/get.png" />
                                        <span>取车</span>
                                    </div>
                                    <div class="timeInfo">
                                        <p>
                                            <i class="el-icon-time"></i>
                                            <span> 2019-03-08 13:56</span>
                                        </p>
                                        <p>
                                            <i class="el-icon-location-outline"></i>
                                            <span>石家庄 正定机场接送点</span>
                                        </p>
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="getCarPlace">
                                    <div class="icon">
                                        <img src="../../../assets/img/put.png" />
                                        <span>还车</span>
                                    </div>
                                    <div class="timeInfo">
                                        <p>
                                            <i class="el-icon-time"></i>
                                            <span> 2019-03-15 12:00</span>
                                        </p>
                                        <p>
                                            <i class="el-icon-location-outline"></i>
                                            <span>石家庄 正定机场接送点</span>
                                        </p>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                      </div>
                  </el-col>
                </el-row>
                <div class="tip">
                    <i class="el-icon-warning"></i>
                    <span>温馨提示：</span>还车结算时，可使用您账户中100元的新用户专享券。
                </div>
            </div>

            <div class="carOrder">
                <div class="memberInfo">
                    <span class="header">租车人信息</span>
                    <span class="warning">请认真填写个人信息，取车时需要现场核对！</span>
                    <hr/>
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
                    <div class="orderWarning">
                        <i class="el-icon-warning"></i>
                        取车时,出示以下证件的原件：本人二代身份证、本人国内有效驾驶证正副本、本人一张信用及可用额度均不低于3000元的国内有效信用卡，所有证件有效期须至少超过当次租期的两个月以上。
                    </div>
                    <hr/>
                    <div class="subOrder">
                        <el-button>提交订单</el-button>
                    </div>
                </div>
                
            </div>

            <el-dialog
            title="雪佛兰科鲁兹配置信息"
            :visible.sync="dialogVisible"
            width="580px"
            :before-close="handleClose">
            <div class="detailList">
                <ul>
                    <li>
                        <b>座 位 数: </b><span>5个</span>
                    </li>
                    <li>
                        <b>车 门 数：</b><span>4个</span>
                    </li>
                    <li>
                        <b>燃料类型：</b><span>汽油</span>
                    </li>
                    <li>
                        <b>变速箱类型：</b><span>AT</span>
                    </li>
                    <li>
                        <b>排　　量：</b><span>1.6T</span>
                    </li>
                    <li>
                        <b>燃油标号：</b><span>92-93汽油</span>
                    </li>
                    <li>
                        <b>驱动方式：</b><span>前驱</span>
                    </li>
                    <li>
                        <b>发动机进气形式：</b><span>自然吸气</span>
                    </li>
                    <li>
                        <b>天　　窗：</b><span>单天窗</span>
                    </li>
                    <li>
                        <b>油箱容量：</b><span>60L</span>
                    </li>
                    <li>
                        <b>倒车雷达：</b><span>无</span>
                    </li>
                    <li>
                        <b>GPS导航：</b><span>无</span>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "taxiPay",
  
  data() {
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
        dialogVisible: false,
        orderForm: {
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

  methods: {
    handleClose(done) {
    this.$confirm('确认关闭？')
        .then(_ => {
        done();
        })
        .catch(_ => {});
    }
}
};
</script>

<style lang="scss">
.taxiPay {
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
          font-family: "Forza-Black", Helvetica, Arial, sans-serif;
          font-weight: 800;
          text-align: left;
          color: #fff;
          font-size: 38px;
          margin: 20px 0 0;
        }
      }
    }
  }

  .taxiContainer{
      padding-top: 20px;
      padding-bottom:300px;
      background-color: #f2f3f5;
      .taxiContent{
        margin: 0 auto;
        max-width: 70em;
        .carInfoContent{
            height: 210px;
            background-color: #fff;
            .carInfo{
                height: 130px;
                border-right: 1px solid #e4e6e9;
                padding: 20px;
                display: flex;
                .carImg{
                    width: 40%;
                    height: 100%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .carName{
                    flex: 1;
                    height: 100%;
                    padding: 0 20px;
                    h3{
                        margin-bottom: 10px;
                    }
                    .info{
                        font-size: 0.9rem;
                        color: #93939e;
                        margin-bottom: 20px;
                    }
                }
            }
            .carPlace{
                height: 150px;
                .getCarPlace{
                    height: 130px;
                    border-right: 1px dashed #e4e6e9;
                    padding: 20px;
                    .icon{
                        height: 28px;
                        padding-bottom: 2px;
                        display: flex;
                        align-items: center;
                        span{
                            margin-left: 10px;
                            font-size: 1.1rem;
                        }
                    }
                    .timeInfo{
                        height: 58px;
                        p{
                            span{
                                color: #93939e;
                                font-size: 1.1rem;
                                font-weight: 500
                            }
                        }
                    }
                }
            }
            .tip{
                height: 40px;
                background-color: #fdfce7;
                display: flex;
                align-items: center;
                padding-left: 20px;
                span{
                    margin-left: 10px;
                    color: #93939e
                }
            }
        }

        .carOrder{
            margin-top: 20px;
            background-color: #fff;
            padding: 20px;
            .memberInfo{
                .header{
                    font-size: 1.2rem;
                    font-weight: 500;
                }
                .warning{
                    margin-left: 10px;
                    color: #ff8650;
                }
                hr{
                    margin: 20px 0;
                }
                .userDetailInfo{
                    padding: 0px 30px 20px;
                    height: 170px;
                    .el-input{
                        width: 20%;
                    }
                }
                .orderWarning{
                    padding: 10px 20px;
                    background-color: #fdfce7;
                }
                hr{
                    margin: 20px 0;
                }   
                .subOrder{
                    height: 50px;
                    .el-button{
                        float: right;
                        height: 100%;
                        width: 120px;
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
        .detailList{
            ul{
                width: 560px;
                margin: 0 auto;
                padding: 0;
                overflow: hidden;
                list-style: none;
                margin-left: 3%;
                li{
                    float: left;
                    width: 45%;
                    border-bottom: 1px dashed #e4e6e9;
                    font-size: 14px;
                    height: 39px;
                    line-height: 39px;
                    color: #93939e;
                }
            }
        }
      }
  }
}
</style>


