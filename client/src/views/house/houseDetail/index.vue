<template>
    <div class="houseDetail">
        <div class="titleContent">
        <div class="listTitle">
            <div class="titleStyle">
            <h2 class="title">更优质的酒店服务</h2>
            </div>
        </div>
        </div>
        <div class="detailContainer">
            <div class="detailContant">
                <div class="detailHeader">
                    <div class="youPlace">
                        <div>
                            <span>您在这里：</span>
                            <span><i class="el-icon-location-outline"/></span>
                            <span>中国 - 上海</span>
                        </div>
                        <div class="weather">
                            <img src="../../../assets/img/sunday.png"/>
                            <span>&nbsp;晴 5°C ~ 15°C</span>
                        </div>
                    </div>
                    <div class="hotelTitle">
                        <div>
                            <h1 class="title">
                            上海大酒店
                            </h1>
                            <div class="engTitle">
                                Grand Central Hotel Shanghai
                            </div>
                            <div class="detailPlace">
                                地址：上海市黄浦区九江路505号
                            </div>
                        </div>
                        <div class="rightGrade">
                            <div class="grade">
                                <span>8.7</span> 分
                            </div>
                            <div class="from">
                                <p class="gradeFrom">评分来自：</p>
                                <span>草鹨旅行网</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detailImg">
                    <div class="mainImg">

                    </div>
                    <div class="smallImg">
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
                <div class="detailInfo">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%;">
                    <el-table-column
                        prop="roomType"
                        label="房型"
                        align="center"
                        width="250">
                        <template slot-scope="scope">
                            <div class="roomInfo">
                                <div class="roomImg">

                                </div>
                                <div class="roomType">
                                    <span>{{ scope.row.roomType }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="bedType"
                        label="床型"
                        align="center"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        prop="service"
                        align="center"
                        min-width="120"
                        label="服务">
                        <template slot-scope="scope">
                            <div class="service">
                                <ul>
                                    <li v-for="ser in scope.row.service" :key="ser">{{ser}}</li>
                                </ul>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        align="center"
                        min-width="120"
                        label="价格">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        align="center"
                        min-width="120"
                        label="预订">
                        <template slot-scope="scope">
                            <el-button
                                @click="handleBuy">确认预订</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'houseDetail',
    data(){
        return{
            tableData: [{
                roomType: '单人间',
                bedType: '单人床',
                service: ['免费早餐','免费停车','免费网络','免费退房'],
                price: 129
            }, {
                roomType: '标准间',
                bedType: '双人床',
                service: ['免费早餐','免费停车','免费网络','免费退房'],
                price: 169
            }, {
                roomType: '商务间',
                bedType: '超大床',
                service: ['免费早餐','免费停车','免费网络','免费退房'],
                price: 199
            }]
        }
    },
    methods: {
        handleBuy(){
            
        }
    }
}
</script>

<style lang="scss">
.houseDetail{
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
  .detailContainer{
      padding-top: 10px;
      padding-bottom:300px;
      background-color: #FAFAFC;
      .detailContant{
        margin: 0 auto;
        max-width: 70em;
        .detailHeader{
            .youPlace{
                height: 40px;
                line-height: 40px;
                display: flex;
                justify-content: space-between;
                font-size: 0.9rem;
                .weather{
                display: flex;
                align-items: center;
                }
            }
            .hotelTitle{
                display: flex;
                justify-content: space-between;
                .title{
                    margin: 0;
                }
                .engTitle{
                    font-size: 14px;
                    line-height: 24px;
                }
                .detailPlace{
                    line-height: 24px;
                    font-size: 14px;
                    color: #999;
                }
                .rightGrade{
                    padding-top: 40px;
                    display: flex;
                    .grade{
                        width: 75px;
                        height: 48px;
                        line-height: 48px;
                        padding: 10px 0;
                        span{
                            font-size: 30px;
                            font-weight: 500;
                            font-style: normal;
                            color: #ff8a00;
                        }
                    }
                    .from{
                        width: 75px;
                        padding: 10px 0;
                        font-size: 0.9rem;
                        .gradeFrom{
                            font-size: 0.8rem;
                            margin: 0;
                        }
                    }
                    

                }
            }
        }
        .detailImg{
            height: 320px;
            display: flex;
            justify-content: space-between;
            .mainImg{
                width: 65%;
                border-radius: 1%;
                background-color: #ff8a00;
            }
            .smallImg{
                width: 35%;
                ul{
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: block;
                    li{
                        float: left;
                        display: inline-block;
                        margin: 0 0 10px 10px;
                        border-radius: 3%;
                        width: 185px;
                        height: 155px;
                        overflow: hidden;
                        cursor: pointer;
                        padding: 0;
                        background-color: green;
                    }
                }
            }
        }
        .detailInfo{
            margin: 30px 0;
            height: 670px;
             .el-table__row{
                height: 180px;
            }
            .el-table{
                color: #2c3e50;
            }
            .el-table thead{
                color: #2c3e50;
            }
            .roomInfo{
                width: 230px;
                .roomImg{
                    height: 125px;
                }
                .roomType{
                    height: 30px;
                    text-align: center;
                }
            }
            .service{
                ul{
                    margin: 0;
                    padding: 0;
                    li{
                        margin: 0;
                        padding: 0;
                        list-style: none;
                        margin: 10px 0;
                    }
                }
            }
        }
      }
  }
}
</style>

