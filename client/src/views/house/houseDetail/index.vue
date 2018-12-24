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
                            <span>中国 - {{currentCity}}</span>
                        </div>
                        <div class="weather">
                            <img src="../../../assets/img/sunday.png"/>
                            <span>&nbsp; {{weatherInfo.weather}}&nbsp; 温度：{{weatherInfo.temperature}}&nbsp; {{weatherInfo.humidity}}</span>
                        </div>
                    </div>
                    <div class="hotelTitle">
                        <div>
                            <h1 class="title">
                                {{detailInfo.houseName}}
                            </h1>
                            <div class="engTitle">
                                {{detailInfo.houseEngName}}
                            </div>
                            <div class="detailPlace">
                                {{detailInfo.houseDetailPlace}}
                            </div>
                        </div>
                        <div class="rightGrade">
                            <div class="grade">
                                <span>{{detailInfo.houseGrade}}</span> 分
                            </div>
                            <div class="from">
                                <p class="gradeFrom">评分来自：</p>
                                <span>{{detailInfo.houseDataFrom}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="detailImg">
                    <div class="mainImg">
                        <img src="../../../assets/img/hotelMain.png" />
                    </div>
                    <div class="smallImg">
                        <ul>
                            <li>
                                <img src="../../../assets/img/detail1.png" />
                            </li>
                            <li>
                                <img src="../../../assets/img/detail2.png" />
                            </li>
                            <li>
                                <img src="../../../assets/img/detail3.png" />
                            </li>
                            <li>
                                <img src="../../../assets/img/detail4.png" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="detailInfo">
                    <el-table
                        :data="roomData"
                        border
                        style="width: 100%;">
                    <el-table-column
                        label="房型"
                        align="center"
                        width="250">
                        <template slot-scope="scope">
                            <div class="roomInfo">
                                <div class="roomImg">
                                    <img :src= scope.row.img>
                                </div>
                                <div class="roomType">
                                    <span>{{ scope.row.name }}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="床型"
                        align="center"
                        min-width="100">
                        <template slot-scope="scope">
                            <p>{{scope.row.window}}</p>
                            <span>{{scope.row.bed}}</span>
                        </template>
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
                        <template slot-scope="scope">
                            <span class="price">{{scope.row.price}}</span> 元
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        min-width="120"
                        label="预订">
                        <template slot-scope="scope">
                            <div class="btn">
                               <p>剩余空房： 
                                   <span :class="{roomQuan: true,lessRoom: scope.row.surPlus < 10}">{{scope.row.surPlus}} </span>
                                   间</p>
                               <el-button
                                @click="handleBuy(scope.row)">确认预订</el-button> 
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                </div>
                <div class="houseInfo">
                    <div class="staticInfo">
                        <dl>
                            <dt>基本信息</dt>
                            <dd>
                                <div class="cell">
                                    <span>执行 OTA: </span>
                                    <span>{{detailInfo.houseStandard}}</span>
                                </div>
                                <div class="cell">
                                    <span>经营资质: </span>
                                    <span>{{detailInfo.houseIntelligence}}</span>
                                </div>
                                <div class="cell">
                                    <span>入住时间: </span>
                                    <span><strong>{{detailInfo.inHouseTime}}</strong>之后</span>
                                </div>
                                <div class="cell">
                                    <span>离店时间: </span>
                                    <span><strong>{{detailInfo.outHouseTime}}</strong>之前</span>
                                </div>
                                <div class="cell">
                                    <span>建成于: </span>
                                    <span><strong>{{detailInfo.houseCreateTime}}</strong>年</span>
                                </div>
                                <div class="cell">
                                    <span>酒店规模: </span>
                                    <span><strong>{{detailInfo.houseRooms}}</strong>间客房</span>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <div class="suggestInfo">
                        <dl>
                            <dt>出行提示</dt>
                            <dd>
                                <ul>
                                    <li>不可携带宠物。</li>
                                    <li>禁止在酒店室内区域吸烟。</li>
                                    <li>只有经过登记的住客才可进入客房。</li>
                                    <li>12 岁及以下的儿童如果与父母或监护人同住一房并使用现有床铺，可免费入住。</li>
                                    <li>不同类型的客房附带不同的取消预订和预先付费政策 选择上述客房时，请参阅“客房政策”</li>
                                    <li>入住时需要出示政府核发的身份证件(带照片)。请携带信用卡和现金用以支付押金或额外费用。</li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="houseMap">
                    <div id="mapContainer">

                    </div>
                    <div class="mapIntroducer">
                        <div class="information">
                            酒店信息
                        </div>
                        <p>
                            {{detailInfo.houseInfo}}
                        </p>
                    </div>
                </div>
                <div class="houseComponent">
                    <div class="lastComponent">最新评论 ({{houseComment.length}}+)</div>
                    <div class="componentContent" v-show="houseComment.length" v-for="comment in houseComment" :key="comment._id">
                        <div class="componentUser">
                            <h4>{{comment.commentName}}</h4>
                            <p class="grade">{{comment.commentGrade}}分</p>
                            <span>{{comment.commentTime}}</span>
                        </div>
                        <div class="componentText">
                            {{comment.commentContent}}
                        </div>
                    </div>
                    <div v-show="!houseComment.length">
                        <p class="noComment">暂时还没有用户评论</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {
    queryHotelByRoomId,
    queryHotelComments
} from '../../../api/hotel/index.js'
export default {
    name: 'houseDetail',
    data(){
        return{
            url: "http://192.168.1.110:3333/",
            roomId: '',
            detailInfo: {},
            map: null,
            roomData: [],
            transit: [121.481429,31.235115],
            houseComment: [],
            weatherInfo: {},
            currentCity: ''
        }
    },
    methods: {
        init(){
            let _this = this
            this.map = new AMap.Map('mapContainer', {
                center: this.transit,
                resizeEnable: true,
                zoom: 16
            })

            var marker = new AMap.Marker({
                position: new AMap.LngLat(this.transit[0],this.transit[1]),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '上海大酒店'
            });

             //获取用户所在城市信息
            function showCityInfo() {
                //实例化城市查询类
                var citysearch = new AMap.CitySearch();	
                //自动获取用户IP，返回当前城市
                citysearch.getLocalCity(function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        _this.currentCity = result.city
                        _this.getWeather()
                    }else{
                        console.log('获取地理信息失败')
                    }
                });
            }
            showCityInfo();

            this.map.addControl(new AMap.OverView({isOpen:true}));
            this.map.addControl(new AMap.Geolocation());
            this.map.add(marker);
        },
        getHouseDetail(){
            queryHotelByRoomId({ roomId: this.roomId }).then((res) => {
                if(res.data.code == 200){
                  this.detailInfo = res.data.body[0]
                  this.roomData.push(this.detailInfo.roomInfo[0].singleRoom[0])
                  this.roomData.push(this.detailInfo.roomInfo[0].standardRoom[0])
                  this.roomData.push(this.detailInfo.roomInfo[0].businessRoom[0])
                  this.transit = this.detailInfo.transit
                  for(let i of this.roomData){
                      i.img = this.url + i.img
                  }
              }
            })
        },
        getHouseComment(){
            queryHotelComments({ roomId: this.roomId }).then((res) => {
                if(res.data.code == 200){
                  this.houseComment = res.data.body[0].roomComments
              }
            })
        },
        handleBuy(room){
            if(!room.surPlus){
                this.$message({
                    message: "该房型已经没有剩余空房",
                    type: 'error'
                });
            }else{
                sessionStorage.setItem('roomName',room.engName)
                this.$router.push('housePay')
            }
        },
        getWeather(){
            let url = '/weather'
            let data = {
                city: this.currentCity.substring(0,2),
                key : '29649541ce654'
            }
            axios({
                method: 'get',
                url: url,
                params: data
            }).then((res) => {
                if(res.data.retCode =='200'){
                    this.weatherInfo = res.data.result[0]
                    console.log(this.weatherInfo)
                }
            })
        },
    },
    created () {        
        this.roomId = sessionStorage.getItem('roomId')
        this.getHouseDetail()
        this.getHouseComment()
        
    },
    mounted () {
        this.init()
        
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
                img{
                    width: 100%;
                    height: 100%;
                }
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
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
        .detailInfo{
            margin: 30px 0;
            height: 610px;
             .el-table__row{
                height: 180px;
            }
            .el-table{
                color: #2c3e50;
            }
            .el-table thead{
                color: #2c3e50;
            }
            .btn{
                .el-button{
                    border-radius: 0px;
                    background-color: #EC6916;
                    color: #fff;
                }
                .el-button:hover{
                    background-color: #E9451A;
                }
                p{
                    .lessRoom{
                        color: #e9451a;
                    }
                    .roomQuan{
                        font-size: 1.2rem;

                    }
                }
            }
            .roomInfo{
                width: 230px;
                .roomImg{
                    height: 125px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .roomType{
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    margin-bottom: -10px;
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
                        color: #458F00;
                    }
                }
            }
            .price{
                font-size: 1.5rem;
                font-weight: 500;
                color: #E9451A;
            }
        }
        .houseInfo{
            height: 350px;
            .staticInfo{
                height: 60px;
                padding: 20px 0;
                border-bottom: 1px solid #ccc;
                dl{
                    margin-left: 155px;
                }
                dt{
                    float: left;
                    display: inline;
                    margin-left: -155px;
                    width: 155px;
                    font-size: 16px;
                }
                dd{
                    .cell{
                        float: left;
                        width: 220px;
                        margin: 0;
                        padding: 0;
                        word-wrap: break-word;
                        font-size: 0.9rem;
                    }
                }
            }
            .suggestInfo{
                height: 188px;
                padding: 20px 0;
                border-bottom: 1px solid #ccc;
                dl{
                    margin-left: 155px;
                }
                dt{
                    float: left;
                    display: inline;
                    margin-left: -155px;
                    width: 155px;
                    font-size: 16px;
                }
                dd{
                    ul{
                        margin: 0;
                        padding: 0;
                        list-style: none;
                        li{
                            margin-bottom: 5px;
                        }
                    }
                }
            }
        }
        .houseMap{
            height: 380px;
            padding: 40px 0;
            display: flex;
            #mapContainer{
                width: 680px;
                height: 380px;
            }
            .mapIntroducer{
                height: 380px;
                flex: 1;
                margin-left: 20px;
                .information{
                    font-size: 1.1rem;
                    padding: 0 0 20px 0;
                    border-bottom: 1px solid #ccc;
                }
            }
        }
        .houseComponent{
            padding: 20px 0;
            .lastComponent{
                font-size: 1.1rem;
                padding: 0 0 20px 0;
                border-bottom: 1px solid #E4E4E4;
            }
            .componentContent{
                display: flex;
                border-bottom: 1px solid #E4E4E4;
                .componentUser{
                    width: 200px;
                    padding: 30px 0 30px;
                    h4{
                        margin: 0px;
                    }
                    span{
                        font-size: 0.9rem
                    }
                    .grade{
                        font-size: 1.2rem;
                        font-weight: 500;
                        color: #e9451a;
                        margin: 8px 0;
                    }
                }
                .componentText{
                    flex: 1;
                    padding: 30px 0 30px;
                }
            }
            .noComment{
                margin: 30px 0 50px;
            }
        }
      }
  }
}
</style>

