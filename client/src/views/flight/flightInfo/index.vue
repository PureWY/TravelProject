<template>
<div class="flightInfo">
    <div class="titleContent">
        <div class="listTitle">
        <div class="titleStyle">
          <h2 class="title">更精确的航班信息</h2>
        </div>
    </div>
    </div>
    <div class="resultContent">
        <div class="result">
            <div class="resultHeader">
                <div class="top">
                    <span>已加载全部</span>
                    <span>共 {{flightInfo.length}} 条航班信息</span>
                </div>
                <div class="bottom">
                    <div class="leftTab">
                        费用计算助手
                    </div>
                    <div class="rightTab">
                        支付方式
                        <div class="tabSelect">
                            线上支付
                        </div>
                    </div>
                </div>
            </div>
            <div class="resultWrapper"  v-for="item in flightInfo" :key="item.planeId">
                <div class="resultInner">
                    <div class="resultInfo">
                        <div class="infoContainer">
                            <div class="flightIcon">
                                <img src="../../../assets/img/flight.png" >
                            </div>
                            <div class="flightTime">
                                <div class="timeDetail">
                                    {{item.startTime}} - {{item.endTime}}
                                </div>
                                <div class="nameDetail">
                                    {{item.flightName}}
                                </div>
                            </div>
                            <div class="flightType">
                                    {{item.startCity}} - {{item.endCity}}
                            </div>
                            <div class="siteType">
                                <div class="siteInfo">
                                    经济舱:&nbsp;&nbsp; <span>{{item.planeInfo.firstClassPrice}} 元</span>
                                </div>
                                <div class="siteInfo">
                                    商务舱:&nbsp;&nbsp; <span>{{item.planeInfo.secondClassPrice}} 元</span>
                                </div>
                                <div class="siteInfo">
                                    头等舱:&nbsp;&nbsp; <span>{{item.planeInfo.thirdClassPrice}} 元</span>
                                </div>
                            </div>
                            <div class="needTime">
                                <div class="detailTime"><span v-show="item.needTime[0]">{{item.needTime[0]}} 天 </span>{{item.needTime[1]}} 小时 {{item.needTime[2]}} 分钟</div>
                            </div>
                        </div>
                    </div>
                    <div class="resultPrice">
                        <div class="priceContainer">
                            <div class="checkSiteType">
                                <el-checkbox-group
                                    v-model="item.planeInfo.siteType"
                                    :max="1"
                                    @change="(siteType)=>checkSite(siteType,item.planeId)">
                                    <el-checkbox v-for="site in siteList" :label="site" :key="site">{{site}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="confirmContent">
                                <div class="confirmPrice">
                                    <span>￥{{item.planeInfo.checkPrice}} 起</span>
                                </div>
                                <div class="confirmButton">
                                    <el-button class="confirmBtn" @click="confirmBuy(item.planeId)" type="warning">确认购买</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    queryFlight
} from '../../../api/plane/index.js'
import {getTime,getDetailTime} from '../../../utils/func.js'

const moment = require('moment');

export default {
    name: 'flightInfo',
    data(){
        return{
            loop: [0,1,2,3,4,5,6,7,8,9,10],
            checkedFlight: false,
            siteList: ['经济舱','商务舱','头等舱'],
            flightInfo: [],
            queryInfo: {},
        }
    },
    created () {
        this.queryFlightInfo()
    },
    methods: {
        //查询航班信息
        queryFlightInfo(){
            this.queryInfo = JSON.parse(localStorage.getItem('queryInfo'))
            queryFlight(this.queryInfo).then(res => {
                  if(res.data.code == 200){
                      this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.flightInfo = res.data.body
                        //解决新赋值属性无法动态渲染到页面上的问题
                        // this.flightInfo = res.data.body.filter(i=>{
                        //     i.needTime = getDetailTime(i.startTime,i.endTime)
                        //     i.startTime = getTime(i.startTime)
                        //     i.endTime = getTime(i.endTime)
                        //     i.planeInfo = i.planeInfo[0]
                        //     i.checkedSite = []
                        //     return i
                        // })
                        //第二种解决办法，强制渲染
                        // this.$set(i,'checkedSite',[])

                        for(let i of this.flightInfo){
                            i.needTime = getDetailTime(i.startTime,i.endTime)
                            i.startTime = getTime(i.startTime)
                            i.endTime = getTime(i.endTime)
                            i.planeInfo = i.planeInfo[0]
                            i.planeInfo.checkPrice = i.planeInfo.firstClassPrice
                        }
                  }
            }).catch((err) => {
                this.$message({
                    message: err.data.message,
                    type: 'warning'
                });
            })
        },

        //选择舱位
        checkSite(value,planeId){
            let checkType = value[0]
            this.flightInfo.map(item => {
                if(item.planeInfo.planeId == planeId){
                    switch(checkType){
                        case "经济舱": 
                            item.planeInfo.checkPrice = item.planeInfo.firstClassPrice;
                            break;
                        case "商务舱":
                            item.planeInfo.checkPrice = item.planeInfo.secondClassPrice;
                            break;
                        case "头等舱":
                            item.planeInfo.checkPrice = item.planeInfo.thirdClassPrice;
                            break;
                        default:
                            item.planeInfo.checkPrice = item.planeInfo.firstClassPrice;
                    }
                }
            })
        },

        //确认购买
        confirmBuy(buyInfo){
            this.flightInfo.map(item => {
                if(item.planeId == buyInfo){
                    if(item.planeInfo.siteType.length == 0){
                        this.$message({
                            message: '请选择舱位',
                            type: 'warning'
                        });
                    }else{
                        this.$router.push('flightPay')
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss">
.flightInfo{
    .titleContent{
        margin-top: -3px;
        background-color: #e9451a;
        .listTitle {
            margin: 0 auto;
            max-width: 70em;
            height: 81px;
            .titleStyle {
                display: flex;
                align-items: flex-end;
                .title{
                    font-family: "Forza-Black",Helvetica,Arial,sans-serif;
                    font-weight: 800;
                    text-align: left;
                    color: #fff;
                    font-size: 38px;
                    margin: 20px 0 0;
                }
            }
    }
    }
    .resultContent{
        padding-top: 20px;
        padding-bottom:300px;
        background-color: #FAFAFC;
        .result{
            max-width: 70em;
            margin: 0 auto;
            .resultHeader{
                height: 86px;
                .top{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 27px;
                    padding-bottom: 10px;
                    color: #6d8494;
                }
                .bottom{
                    height: 39px;
                    margin-bottom: 10px;
                    border: 1px solid #6d8494;
                    color: #344755;
                    font-size: 13px;
                    font-weight: 600;
                    .leftTab{
                        width: 49%;
                        float: left;
                        height: 39px;
                        border-right: 1px solid #6d8494;
                        padding-left: 20px;
                        line-height: 39px;
                    }
                    .rightTab{
                        width: 45%;
                        float: right;
                        height: 39px;
                        line-height: 39px;
                        padding: 0 20px;
                        .tabSelect{
                            float: right;
                        }
                    }
                }
            }
            .resultWrapper{
                margin: 15px 0;
                max-width: 70em;
                z-index: 0;
                overflow: hidden;
                background: white;
                border: 1px solid #d9e1e8;
                border-color: transparent!important;
                box-shadow: 0 0 2px 0 rgba(19,26,31,0.12),0 2px 4px 0 rgba(19,26,31,0.22)!important;
                .resultInner{
                    display: flex;
                    height: 150px;
                    flex-flow: row nowrap;
                    .resultInfo{
                        width: 75%;
                        height: 100%;
                        .infoContainer{
                            height: 100px;
                            padding: 25px;
                            display: flex;
                            align-items: center;
                            .flightIcon{
                                width: 48px;
                                height: 48px;
                                margin-left: 40px;
                            }
                            .flightTime{
                                margin-left: 40px;
                                width: 150px;
                                height: 80px;
                                .timeDetail{
                                    font-weight: 600;
                                    font-size: 20px;
                                    height: 40px;
                                    line-height: 40px;
                                }
                                .nameDetail{
                                    font-weight: 400;
                                    font-size: 16px;
                                    height: 40px;
                                    line-height: 40px;
                                }
                            }
                            .flightType{
                                width: 120px;
                                height: 80px;
                                font-size: 16px;
                                font-weight: 500;
                                margin-left: 40px;
                                line-height: 80px;
                            }
                            .siteType{
                                width: 150px;
                                height: 90px;
                                margin-left: 40px;
                                .siteInfo{
                                    height: 30px;
                                    line-height: 30px;
                                    span{
                                        font-weight: 600;
                                        font-size: 16px;
                                    }
                                }
                            }
                            .needTime{
                                width: 150px;
                                height: 80px;
                                line-height: 80px;
                                font-weight: 600;
                                font-size: 18px;
                            }
                        }
                    }
                    .resultPrice{
                        width: 25%;
                        height: 100%;
                        border-left: 1px solid #D9E1E8;
                        .priceContainer{
                            height: 120px;
                            padding: 15px;
                            .checkSiteType{
                                height: 60px;
                                line-height: 60px;
                                .el-checkbox{
                                    margin-left: 10px;
                                }
                            }
                            .confirmContent{
                                height: 60px;
                                .confirmPrice{
                                    text-align: center;
                                    width: 50%;
                                    height: 50px;
                                    float: left;
                                    line-height: 50px;
                                    font-size: 24px;
                                    font-weight: 600;
                                }
                                .confirmButton{
                                    width: 50%;
                                    height: 50px;
                                    line-height: 50px;
                                    float: right;
                                    text-align: center;
                                    .confirmBtn{
                                        background-color: #E9431A;
                                        border-radius: 0px;
                                    }
                                    .confirmBtn:hover{
                                        background-color: #C13111;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

