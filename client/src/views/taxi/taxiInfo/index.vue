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
                                    <el-input placeholder="请输入租车位置" v-model="carCity" class="input-with-select">
                                        <el-button slot="append" @click="handleQuery" icon="el-icon-search"></el-button>
                                    </el-input>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item class="commonStyle" title="车辆价格" name="2">
                                    <div class="lowPrice">
                                        <span>最低价：</span>
                                        <el-input-number :min='100' :max='499' size="mini" v-model="listQuery.lowPrice"></el-input-number>
                                    </div>
                                    <div>
                                        <span>最高价：</span>
                                        <el-input-number :max='500' :min='101' size="mini" v-model="listQuery.highPrice"></el-input-number>
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
                                <el-button @click="handleQuery" class="btn">筛选查询</el-button>
                            </div>
                        </div>
                    </el-col>
                    <el-col v-loading="loading" element-loading-text="正在查询酒店信息" :span="13">
                        <div class="commonStyle middleContent" v-for="house in houseInfo" :key="house._id">
                            
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
    queryHotel,
    screenQueryHotel
} from '../../../api/hotel/index.js'
export default {
  name: "taxiInfo",
  data() {
    return {
        queryCity:'',
        num7: 3,
        activeNames: ['1','2','3','4'],
        // activeNames: [],
        loading: false,
        listQuery: {
            lowPrice: 102,
            highPrice: 201,
            carType: [true,true,true,false,false],
            carSite: [true,true,true],
            houseName: '',
            houseDetailPlace: ''
        },
        carCity: '',
        carType: ["小型车","中型车","SUV","大型SUV"],
        carSite: ["双人座","五人座","七人座"],
        carPrice: [100,200,300],
        houseInfo: []
    };
  },
  created() {
      this.queryCity = JSON.parse(sessionStorage.getItem('queryHotel'))
  },
  methods: {
      handleChange(val) {
      },
      handleQuery(){
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




