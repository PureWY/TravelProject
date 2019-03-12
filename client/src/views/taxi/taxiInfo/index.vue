<template>
  <div class="taxiInfo">
    <div class="titleContent">
      <div class="listTitle">
        <div class="titleStyle">
          <h2 class="title">更便捷的出行方式</h2>
        </div>
      </div>
    </div>

    <div class="hotelContainer">
        <div class="hotelContent">
            <div class="resultHeader">
                <div class="top">
                    <span>已加载全部</span>
                    <span>共 7 条租车信息</span>
                </div>
            </div>
            <div class="resultContent">
                <el-row :gutter="20">
                    <el-col :span="5">
                        <div class="commonStyle leftSelect">
                            <el-collapse v-model="activeNames"  @change="handleChange">
                            <el-collapse-item class="commonStyle" title="地点" name="1">
                                <div class="placesSelect">
                                    <el-input placeholder="请输入租车位置" v-model="listQuery.taxiPlace" class="input-with-select">
                                        <el-button slot="append" @click="handleScreenQuery" icon="el-icon-search"></el-button>
                                    </el-input>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item class="commonStyle" title="车辆价格" name="2">
                                    <div class="lowPrice">
                                        <span>最低价：</span>
                                        <el-input-number :min='100' :max="listQuery.highPrice-1" size="mini" v-model="listQuery.lowPrice"></el-input-number>
                                    </div>
                                    <div>
                                        <span>最高价：</span>
                                        <el-input-number :max='500' :min="listQuery.lowPrice+1" size="mini" v-model="listQuery.highPrice"></el-input-number>
                                    </div>
                            </el-collapse-item>
                            <el-collapse-item class="commonStyle" title="车身类型" name="3">
                                <div class="eatSelect">
                                    <ul class="eatUl">
                                        <li v-for="(value,index) in carType" :key="value">
                                            <span>{{value}}</span>
                                            <span class="middleNum">21辆</span>
                                            <span class="rightCheck">
                                                <el-switch
                                                v-model="listQuery.carType[index]"
                                                active-color="#E9451A">
                                                </el-switch>
                                            </span></li>
                                    </ul>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item class="commonStyle" title="车辆座位" name="4">
                                <div class="eatSelect">
                                    <ul class="eatUl">
                                        <li v-for="(value,index) in carSite" :key="value">
                                            <span>{{value}}</span>
                                            <span class="middleNum">21辆</span>
                                            <span class="rightCheck">
                                                <el-switch
                                                v-model="listQuery.carSite[index]"
                                                active-color="#E9451A">
                                                </el-switch>
                                            </span></li>
                                    </ul>
                                </div>
                            </el-collapse-item>
                            </el-collapse>
                            <div class="screenQuery">
                                <el-button @click="handleScreenQuery" class="btn">筛选查询</el-button>
                            </div>
                        </div>
                    </el-col>
                    <el-col v-loading="loading" element-loading-text="正在查询租车信息" :span="13">
                        <div class="commonStyle middleContent" v-for="taxi in taxiInfo" :key="taxi._id">
                            <el-row>
                              <el-col :span="18">
                                  <div class="common detailInfo">
                                      <div class="carName">
                                          <div class="title">
                                              <span>{{taxi.carEngName}}</span>
                                              <i class="el-icon-question"></i>
                                          </div>
                                          <div class="tag">
                                              <span>{{taxi.carType}}</span> / <span>{{taxi.carDoorType}}</span>
                                          </div>
                                      </div>
                                      <div class="carMainInfo">
                                          <el-row>
                                            <el-col :span="12">
                                                <div class="carService">
                                                    <div class="serverList">
                                                        <ul>
                                                            <li>
                                                                <div class="icon"><img src="../../../assets/img/user.png" /><span>{{taxi.carSites}} 人</span></div>
                                                            </li>
                                                            <li>
                                                                <div class="icon"><img src="../../../assets/img/bag.png" /><span>{{taxi.carBaggages}} L</span></div>
                                                            </li>
                                                            <li>
                                                                <div class="icon"><img src="../../../assets/img/oil.png" /><span>{{taxi.carOil}} L</span></div>
                                                            </li>
                                                            <li>
                                                                <div class="icon"><img src="../../../assets/img/lihe.png" /><span>{{taxi.carAuto}}</span></div>
                                                            </li>
                                                            <li>
                                                                <div class="icon"><img src="../../../assets/img/kongtiao.png" /><span>{{taxi.carHaveMotion}}</span></div>
                                                            </li>
                                                            <li>
                                                                <div class="icon"><img src="../../../assets/img/window.png" /><span>{{taxi.carHaveWindow}}</span></div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                
                                            </el-col>
                                            <el-col :span="12">
                                                <div class="carImg">
                                                    <img src="../../../assets/img/troc.jpg" />
                                                </div>
                                            </el-col>
                                          </el-row>
                                      </div>
                                      <div class="offer">
                                          <div class="offerInfo"><img src="../../../assets/img/yes.png" /> {{taxi.carHaveLimit}}</div>
                                          <div class="offerInfo"><img src="../../../assets/img/yes.png" /> {{taxi.carForFunc}}</div>
                                          <div class="offerInfoPlus"><i class="el-icon-location"></i>{{taxi.carDetailPlace}}</div>
                                      </div>
                                  </div>
                              </el-col>
                              <el-col :span="6">
                                  <div class="common priceInfo">
                                      <div class="top">
                                          <div>*温馨提示：</div>
                                          <ul>
                                              <li>请勿酒后驾车</li>
                                              <li>请勿车内吸烟</li>
                                              <li>请勿携带宠物</li>
                                              <li>请勿疲劳驾驶</li>
                                              <li>请勿损坏车辆</li>
                                          </ul>
                                          <div class="prices">
                                              ￥{{taxi.carPrice}}
                                          </div>
                                      </div>
                                      <div class="bottom">
                                          <el-button @click="handlePay(taxi.carId)" class="button">确认预订</el-button>
                                      </div>
                                  </div>    
                              </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="commonStyle rightAdvs">
                            <img src="../../../assets/img/advs.jpg">
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {
    queryTaxi,
    screenQueryTaxi
} from '../../../api/taxi/index.js'
export default {
  name: "taxiInfo",
  data() {
    return {
        queryCity:'',
        num7: 3,
        loading: false,
        activeNames: ['1','2','3','4'],
        // activeNames: [],
        listQuery: {
            lowPrice: 100,
            highPrice: 499,
            carType: [true,true,true,true],
            carSite: [true,true,true],
            taxiPlace: '',
        },
        carCity: '',
        carType: ["小型车","中型车","SUV","大型SUV"],
        carSite: ["双人座","五人座","七人座"],
        carPrice: [100,200,300],
        taxiInfo: []
    };
  },
  created() {
      this.queryCity = sessionStorage.getItem('taxiCity')
      this.handleQuery()
  },
  methods: {
      handleChange(val) {
      },
      handlePay(carId){
          sessionStorage.setItem('carId',carId)
          this.$router.push('./taxiPay')
      },
      handleQuery(){
        let parmas = {
            taxiCity: this.queryCity
        }
        queryTaxi(parmas).then(res => {
            if(res.data.code == 200){
                this.taxiInfo = res.data.body
                console.log(this.taxiInfo)
            }else{
                this.$message({
                    message: res.data.message,
                    type: 'warning'
                });
            }
        }).catch((err) => {
            console.log(err)
        })
      },

      handleScreenQuery(){
        this.loading = true
        this.listQuery.carCity = this.queryCity
        console.log(this.listQuery)
        screenQueryTaxi(this.listQuery).then(res => {
            if(res.data.code == 200){
                setTimeout(() => {
                    this.taxiInfo = res.data.body
                    this.loading = false
                },2000)
            }
        }).catch(() => {
            setTimeout(() => {
            this.loading = false
            },1000)
        })
      }
  }
};
</script>

<style lang="scss">
.taxiInfo {
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
  .hotelContainer{
      padding-top: 20px;
      padding-bottom:300px;
      background-color: #FAFAFC;
      .hotelContent{
        margin: 0 auto;
        max-width: 70em;
        .resultHeader{
            height: 50px;
            .top{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 27px;
                padding-bottom: 10px;
                color: #6d8494;
            }
        }
        .resultContent{
            width: 100%;
            .el-collapse{
                border-bottom: none;
            }
            .el-collapse-item__header{
                font-size: 14px;
                font-weight: 600
            }
            .commonStyle{
                margin-bottom: 10px;
                .lowPrice{
                    margin-bottom: 15px;
                }
            }
            .leftSelect{
                .starSelect{
                    .el-rate__icon{
                        font-size: 1.5rem;
                        color: rgb(233, 69, 26) !important
                    }
                    .el-rate__text{
                        font-size: 0.8rem;
                    }
                }
                .numberSelect{
                    .el-rate__icon{
                        font-size: 1.5rem;
                        color: #ff9900 !important
                    }
                    .el-rate__text{
                        font-size: 0.9rem;
                    }
                }
                .eatSelect{
                    // margin-top: -10px;
                    .eatUl{
                        list-style: none;
                        padding: 0;
                        li{
                            padding-bottom: 8px;
                            font-size: 14px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .rightCheck{
                                margin-right: 20px;
                            }
                            .middleNum{
                                color: #6d8494;

                            }
                        }
                    }
                }
                .nameSelect{
                    padding-right: 15px;
                }
                .placesSelect{
                    padding-right: 15px;
                }
                .typeSelect{
                    .typeUl{
                        list-style: none;
                        padding: 0;
                        li{
                            padding-bottom: 8px;
                            font-size: 14px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .rightCheck{
                                margin-right: 20px;
                            }
                            .middleNum{
                                color: #6d8494;

                            }
                        }
                    }
                }
                .screenQuery{
                    margin-top: 30px;
                    height: 50px;
                    text-align: center;
                    .btn{
                        width: 100%;
                    }
                    .el-button:hover{
                        color: #EC6A16;
                        border-color: #EC6A16;
                    }
                    .el-button:active{
                        color: #EC6A16;
                        border-color: #EC6A16;
                    }
                    .el-button:focus{
                        color: #EC6A16;
                        border-color: #EC6A16;
                    }
                }
            }
            .middleContent{
                border-width: 1px;
                border-style: solid;
                border-color: transparent!important;
                box-shadow: 0 0 2px 0 rgba(19,26,31,0.12),0 2px 4px 0 rgba(19,26,31,0.22)!important;
                margin-bottom: 20px;
                .common{
                    height: 240px;
                }
                .detailInfo{
                    padding: 15px;
                    .carName{
                        height: 45px;
                        .title{
                            display: flex;
                            align-items: center;
                            span{
                                font-weight: 500;
                                color: #17232c;
                                font-size: 1.1rem;
                                margin-right: 5px;
                            }
                        }
                        .tag{
                            padding-top: 4px;
                            span{
                                color: #6d8494;
                                font-size: 0.8rem;
                            }
                        }
                        
                    }
                    .carMainInfo{
                        .carService{
                            .serverList{
                                height: 70px;
                                ul{
                                    list-style: none;
                                    padding: 0;
                                    margin: 0;
                                    display: block;
                                    li{
                                        float: left;
                                        display: inline-block;
                                        margin: 0 10px 10px 0px;
                                        border-radius: 3%;
                                        width: 80px;
                                        height: 40px;
                                        overflow: hidden;
                                        cursor: pointer;
                                        padding: 0;
                                        .icon{
                                            display: flex;
                                            align-items: center;
                                            padding-top: 15px;
                                            span{
                                                margin-left: 7px;
                                                font-size: 0.8rem
                                            }
                                        }
                                    }
                                }
                            }
                            .outService{
                                height: 70px;
                            }
                        }
                        
                        .carImg{
                            height: 140px;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    .offer{
                        height: 45px;
                        border-top-color: #dae0e5;
                        border-top-width: 1px;
                        border-top-style: solid;
                        padding-top: 10px;
                        .offerInfo{
                            width: 180px;
                            height: 20px;
                            float: left;
                        }
                        .offerInfoPlus{
                            height: 20px;
                            padding-top: 5px;
                            margin-left: -2px;
                            color: #6d8494;
                            float: left;
                            i{
                                margin-right: 2px;
                            }
                        }
                    }
                }
                .priceInfo{
                    padding: 15px 15px 15px 0;
                    border-left-color: #dae0e5;
                    border-left-style: solid;
                    border-left-width: 1px;
                    .top{
                        height: 175px;
                        padding-left: 15px;
                        padding-top: 10px;
                        .prices{
                            color: #EC6916;
                            font-weight: 600;
                            font-size: 1.6rem;
                        }
                        ul{
                            margin: 0;
                            padding: 10px 10px 5px 10px;
                            li{
                                font-size: 0.9rem;
                                color: #6d8494;
                                margin-bottom: 5px;
                            }
                        }
                    }
                    .bottom{
                        height: 60px;
                        padding-left: 15px;
                        display: flex;
                        align-items: center;
                        .button{
                            background-color: #E9451A;
                            color: #fff;
                            border-radius: 0px;
                        }
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
            .rightAdvs{
                height: 200px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
      }
  }
}
</style>




