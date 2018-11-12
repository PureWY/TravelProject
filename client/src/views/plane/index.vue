<template>
<div class="plane">
    <headerBarComponent></headerBarComponent>
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
                    <span>共 231 条航班信息</span>
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
            <div class="resultWrapper"  v-for="item in loop" :key="item">
                <div class="resultInner">
                    <div class="resultInfo">
                        <div class="infoContainer">
                            <div class="flightIcon">
                                <img src="../../assets/img/flight.png" >
                            </div>
                            <div class="flightTime">
                                <div class="timeDetail">
                                    14:50 - 16:25
                                </div>
                                <div class="nameDetail">
                                    中国东方航空
                                </div>
                            </div>
                            <div class="flightType">
                                直飞
                            </div>
                            <div class="siteType">
                                <div class="siteInfo">
                                    经济舱:&nbsp;&nbsp; <span>388</span>
                                </div>
                                <div class="siteInfo">
                                    商务舱:&nbsp;&nbsp; <span>688</span>
                                </div>
                                <div class="siteInfo">
                                    头等舱:&nbsp;&nbsp; <span>888</span>
                                </div>
                            </div>
                            <div class="needTime">
                                <div class="detailTime"><span>1</span> 小时 <span>55</span> 分钟</div>
                            </div>
                        </div>
                    </div>
                    <div class="resultPrice">
                        <div class="priceContainer">
                            <div class="checkSiteType">
                                <el-checkbox-group 
                                    v-model="checkedCities1"
                                    :max="1">
                                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="confirmContent">
                                <div class="confirmPrice">
                                    ￥<span>4888</span>
                                </div>
                                <div class="confirmButton">
                                    <el-button class="confirmBtn" type="warning">确认购买</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
        <footerComponent></footerComponent>
    </div>
</div>
</template>

<script>
import headerBarComponent from '../../components/headerbar'
import footerComponent from '../../components/footer'
export default {
    name: 'plane',
    components: {headerBarComponent,footerComponent},
    data(){
        return{
            loop: [0,1,2,3,4,5,6,7,8,9,10],
            checkedFlight: false,
            checkedCities1: ['经济舱'],
            cities: ['经济舱', '商务舱', '头等舱']
        }
    },
    methods: {
        
    }

}
</script>

<style lang="scss">
.plane{
    min-width: 21.3em;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-weight: 400;
    font-size: 15px;
    line-height: 1.231; 
    color: #17232c;
    -webkit-font-smoothing: antialiased;
    .titleContent{
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
        padding-bottom:275px;
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
                                width: 70px;
                                height: 50px;
                                font-size: 16px;
                                line-height: 50px;
                                margin-left: 40px;
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
                                    height: 60px;
                                    float: left;
                                    line-height: 60px;
                                    font-size: 24px;
                                    font-weight: 600;
                                }
                                .confirmButton{
                                    width: 50%;
                                    height: 60px;
                                    line-height: 60px;
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
    .footer{
        width: 100%;
        height:275px; 
        position:absolute;
        bottom:0;
        background-color: #ffc0cb;
    }
    
}
</style>

