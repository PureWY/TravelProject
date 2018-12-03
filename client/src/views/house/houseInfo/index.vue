<template>
  <div class="houseInfo">
    <div class="titleContent">
      <div class="listTitle">
        <div class="titleStyle">
          <h2 class="title">更优选的酒店信息</h2>
        </div>
      </div>
    </div>

    <div class="hotelContainer">
        <div class="hotelContent">
            <div class="resultHeader">
                <div class="top">
                    <span>已加载全部</span>
                    <span>共 {{houseInfo.length}} 条酒店信息</span>
                </div>
            </div>
            <div class="resultContent">
                <el-row :gutter="20">
                    <el-col :span="5">
                        <div class="commonStyle leftSelect">
                            <el-collapse v-model="activeNames" @change="handleChange">
                            <el-collapse-item class="commonStyle" title="星级" name="1">
                                <div class="starSelect">
                                    <el-rate
                                        :texts="starClass"
                                        show-text
                                        v-model="value1">
                                    </el-rate>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item class="commonStyle" title="点评分数" name="2">
                                <div class="numberSelect">
                                    <el-rate
                                        v-model="value2"
                                        show-score
                                        text-color="#3E4B59"
                                        score-template="{value}分">
                                    </el-rate>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item class="commonStyle" title="免费提供" name="3">
                                <div class="eatSelect">
                                    <ul class="eatUl">
                                        <li>
                                            <span>免费早餐</span>
                                            <span class="middleNum">233家</span>
                                            <span class="rightCheck">
                                                <el-switch
                                                v-model="value3List[0]"
                                                active-color="#E9451A">
                                                </el-switch>
                                            </span></li>
                                        <li>
                                            <span>免费网络</span>
                                            <span class="middleNum">233家</span>
                                            <span class="rightCheck">
                                                <el-switch
                                                v-model="value3List[1]"
                                                active-color="#E9451A">
                                                </el-switch>
                                            </span>
                                        </li>
                                        <li>
                                            <span>免费停车</span>
                                            <span class="middleNum">233家</span>
                                            <span class="rightCheck">
                                                <el-switch
                                                v-model="value3List[2]"
                                                active-color="#E9451A">
                                                </el-switch>
                                            </span>
                                        </li>
                                        <li>
                                            <span>免费取消</span>
                                            <span class="middleNum">233家</span>
                                            <span class="rightCheck">
                                                <el-switch
                                                v-model="value3List[3]"
                                                active-color="#E9451A">
                                                </el-switch>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item class="commonStyle" title="价格" name="4">
                                <div class="priceSelect">
                                    <el-input-number controls-position="right" :min="0" :max="1000" size="mini" v-model="value4List[0]"></el-input-number>
                                    <span>&nbsp;－&nbsp;</span>
                                    <el-input-number controls-position="right" :min="100" :max="1000" size="mini" v-model="value4List[1]"></el-input-number>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item class="commonStyle" title="酒店名称" name="5">
                                <div class="nameSelect">
                                    <el-input placeholder="请输入酒店名称" v-model="value5" class="input-with-select">
                                        <el-button slot="append" icon="el-icon-search"></el-button>
                                    </el-input>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item class="commonStyle" title="地点" name="6">
                                <div class="placesSelect">
                                    <el-input placeholder="请输入酒店位置" v-model="value6" class="input-with-select">
                                        <el-button slot="append" icon="el-icon-search"></el-button>
                                    </el-input>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item class="commonStyle" title="住宿类型" name="7">
                                <div class="typeSelect">
                                    <ul class="typeUl">
                                        <li>
                                            <span>酒店</span>
                                            <span class="middleNum">233家</span>
                                            <span class="rightCheck">
                                                <el-switch
                                                v-model="value7List[0]"
                                                active-color="#E9451A">
                                                </el-switch>
                                            </span></li>
                                        <li>
                                            <span>公寓式酒店</span>
                                            <span class="middleNum">233家</span>
                                            <span class="rightCheck">
                                                <el-switch
                                                v-model="value7List[1]"
                                                active-color="#E9451A">
                                                </el-switch>
                                            </span>
                                        </li>
                                        <li>
                                            <span>客栈</span>
                                            <span class="middleNum">233家</span>
                                            <span class="rightCheck">
                                                <el-switch
                                                v-model="value7List[2]"
                                                active-color="#E9451A">
                                                </el-switch>
                                            </span>
                                        </li>
                                        <li>
                                            <span>青年旅舍</span>
                                            <span class="middleNum">233家</span>
                                            <span class="rightCheck">
                                                <el-switch
                                                v-model="value7List[3]"
                                                active-color="#E9451A">
                                                </el-switch>
                                            </span>
                                        </li>
                                        <li>
                                            <span>度假屋</span>
                                            <span class="middleNum">233家</span>
                                            <span class="rightCheck">
                                                <el-switch
                                                v-model="value7List[4]"
                                                active-color="#E9451A">
                                                </el-switch>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-col>
                    <el-col :span="13">
                        <div class="commonStyle middleContent" v-for="house in houseInfo" :key="house._id">
                            <el-row>
                                <el-col :span="6">
                                    <div class="hotelImg common">
                                        <img src="../../../assets/img/hotel.jpg">
                                    </div>
                                </el-col>
                                <el-col :span="13">
                                    <div class="hotelInfo common">
                                        <div class="infoName">
                                            <h3>{{house.houseName}}</h3>
                                            <span>
                                                <i class="el-icon-star-on"></i>
                                                <i class="el-icon-star-on"></i>
                                                <i class="el-icon-star-on"></i>
                                                <i class="el-icon-star-on"></i>
                                                <i class="el-icon-star-on"></i>
                                            </span>
                                            <span class="hotelTag">
                                                {{house.houseTag}}
                                            </span>
                                        </div>
                                        <div class="infoStar">
                                            <span class="star">{{house.houseGrade}}</span>
                                            <span class="common"> &nbsp;评价：</span>
                                            <span v-if="house.houseGrade > 4.5">极好</span>
                                            <span v-else-if="house.houseGrade > 4">好</span>
                                            <span v-else-if="house.houseGrade > 3">一般</span>
                                            <span v-else>差</span>
                                            <span class="common"> &nbsp;位置：</span><span>{{house.houseAreaPlace}}</span>
                                        </div>
                                        <div class="infoType">
                                            <span class="roomType">单人间:</span><span class="roomPrice">￥{{house.roomInfo.singlePrice}}</span>
                                            <span class="roomType">标准间:</span><span class="roomPrice">￥{{house.roomInfo.standardPrice}}</span>
                                            <span class="roomType">商务间:</span><span class="roomPrice">￥{{house.roomInfo.businessPrice}}</span>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="5">
                                    <div class="hotelPrice common">
                                        <div class="price">
                                            <h3>￥{{house.roomInfo.singlePrice}} 起</h3>
                                        </div>
                                        <div class="info">
                                            <p class="header">数据来源:</p>
                                            <p class="content">{{house.houseDataFrom}}</p>
                                        </div>
                                        <div class="btn">
                                            <el-button>提交订单</el-button>
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
    queryHotel
} from '../../../api/hotel/index.js'
export default {
  name: "houseInfo",
  data() {
    return {
        activeNames: ['1','2','3','4','5','6','7'],
        value1: null,
        starClass: ["一星级","二星级","三星级","四星级","五星级"],
        value2: null,
        value3List: [true,false,true,false],
        value4List: [0,1000],
        value5: '',
        value6: '',
        value7List: [true,false,true,false,false],
        loop: [1,2,3,4,5,6,7,8,9,10],
        houseInfo: []
    };
  },
  created() {
    this.getHouse()
  },
  methods: {
      handleChange(val) {
        console.log(val);
      },
      getHouse(){
          let place = this.$store.getters.queryHotel.sleepCity
          let parmas = {
              houseCityPlace: place
          }
          queryHotel(parmas).then(res => {
              if(res.data.code == 200){
                  this.houseInfo = res.data.body
                  for(let i of this.houseInfo){
                      i.roomInfo = i.roomInfo[0]
                  }
                  console.log(this.houseInfo)
              }
          }).catch(() => {

          })
      }
  }
};
</script>

<style lang="scss">
.houseInfo {
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
                .priceSelect{
                    .el-input-number--mini{
                        width: 85px;
                    }
                    .el-input__inner{
                        padding-left: 5px;
                        padding-right: 30px;
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
            }
            .middleContent{
                border-width: 1px;
                border-style: solid;
                border-color: transparent!important;
                box-shadow: 0 0 2px 0 rgba(19,26,31,0.12),0 2px 4px 0 rgba(19,26,31,0.22)!important;
                margin-bottom: 20px;
                .common{
                    height: 160px;
                }
                .hotelImg{
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .hotelInfo{
                    .infoName{
                        height: 55px;
                        padding: 15px 20px 10px;
                        h3{
                            margin: 0 0 7px;
                        }
                        .hotelTag{
                            display: inline-block;
                            width: 75px;
                            padding: 0 10px;
                            margin-left: 10px;
                            height: 17px;
                            font-size: 0.6rem;
                            background-color: #92aabb;
                            color: #fff;
                        }
                    }
                    .infoStar{
                        height: 30px;
                        padding: 5px 20px;
                        .star{
                            display: inline-block;
                            width: 30px;
                            height: 30px;
                            background-color: #4494F5;
                            color: #fff;
                            line-height: 30px;
                            text-align: center;
                        }
                        .common{
                            font-weight: 600;
                            margin-left: 10px;
                        }
                    }
                    .infoType{
                        height: 30px;
                        padding: 5px 0 5px 20px;
                        .roomType{
                            font-size: 0.9rem;
                            
                        }
                        .roomPrice{
                            font-size: 0.9rem;
                            color: #EC6916;
                            font-weight: 500;
                            margin-right: 10px;
                        }
                    }
                }
                .hotelPrice{
                    .price{
                        padding-top: 20px;
                        height: 30px;
                        h3{
                            color: #EC6916;
                            // padding: 20px 0 10px;
                            margin: 0;
                        }
                    }
                    .info{
                        height: 50px;
                        p{
                            font-size: 0.9rem;
                            margin: 0;
                            padding: 1px 5px;
                        }
                        .header{
                            font-size: 0.8rem;
                            color: #11B19B;
                        }
                        .content{
                            font-weight: 500
                        }
                    }
                    .btn{
                        height: 50px;
                        line-height: 50px;
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

