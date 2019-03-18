<template>
    <div class="hotelEvaluate">
        <headerComponent></headerComponent>
        <div class="titleContent">
            <div class="listTitle">
                <div class="titleStyle">
                    <h2 class="title">草鹨感谢您的每一次评价</h2>
                </div>
            </div>
        </div>
        <div class="evaluateContainer">
            <div class="evaluateContent">
                <div class="evaluateBody">
                    <el-row>
                      <el-col :span="6">
                          <div class="hotelInfo">
                              <div class="hotelImg">
                                  <img :src="this.hotelInfo.houseImg" />
                              </div>
                              <div class="hotelDetail">
                                  <h3>{{this.hotelInfo.houseName}}</h3>
                                  <div>{{this.hotelInfo.name}} {{this.hotelInfo.allTime}}晚</div>
                                  <div>{{this.hotelInfo.startTime}} 入住</div>
                                  <div>{{this.hotelInfo.endTime}} 退房</div>
                                  <div class="detailPrice">￥{{this.hotelInfo.allPrice}}</div>
                              </div>
                          </div>
                      </el-col>
                      <el-col :span="18">
                          <div class="evaluateInfo">
                              <p><i class="el-icon-warning"></i> 请认真填写酒店评价</p>
                              <div class="evaluateStar commonContainer">
                                  <div class="commonTitle">酒店评分：</div>
                                  <div class="commonContent">
                                      <el-rate
                                        :texts="starClass"
                                        show-text
                                        v-model="listQuery.commentGrade">
                                    </el-rate>
                                  </div>
                              </div>
                              <div class="commonContainer">
                                  <div class="commonTitle">酒店评价：</div>
                                  <div class="commonContent">
                                      <textarea v-model="listQuery.commentContent" class="textArea" placeholder=" 分享住店心得，让更多人了解这家酒店~"></textarea>
                                  </div>
                              </div>
                              <div class="evaluateCheck commonContainer">
                                  <div class="commonTitle">舒适度：</div>
                                  <div class="commonContent">
                                      <el-radio-group v-model="listQuery.commentSoft">
                                        <el-radio-button v-for="soft in softList" :label="soft.text" :key="soft.id"></el-radio-button>
                                      </el-radio-group>
                                  </div>
                              </div>
                              <div class="evaluateCheck commonContainer">
                                  <div class="commonTitle">服务质量：</div>
                                  <div class="commonContent">
                                      <el-radio-group v-model="listQuery.commentService">
                                        <el-radio-button v-for="service in softList" :label="service.text" :key="service.id"></el-radio-button>
                                      </el-radio-group>
                                  </div>
                              </div>
                              <div class="evaluateCheck commonContainer">
                                  <div class="commonTitle">周边环境：</div>
                                  <div class="commonContent">
                                      <el-radio-group v-model="listQuery.commentBackground">
                                        <el-radio-button v-for="background in softList" :label="background.text" :key="background.id"></el-radio-button>
                                      </el-radio-group>
                                  </div>
                              </div>
                          </div>
                      </el-col>
                    </el-row>
                </div>
                <div class="evaluateFooter">
                    <el-button @click="handleSubmit" class="btn">发表评价</el-button>
                </div>
            </div>
        </div>
        <div class="footer">
            <footerComponent></footerComponent>
        </div>
    </div>
</template>

<script>
import headerComponent from '../../components/header'
import footerComponent from '../../components/footer'
import {
    createHotelComments
} from '../../api/hotel/index.js'
export default {
    name: 'evaluate',
    components: { headerComponent, footerComponent },
    data() {
        return {
            hotelInfo: {},
            listQuery: {
                commentSoft: '',
                commentService: '',
                commentBackground: '',
                commentContent: '',
                commentGrade: null
            },
            starClass: ["1 分","2 分","3 分","4 分","5 分"],
            softList: [
                {
                    id: 0,
                    text: '不好'
                },
                {
                    id: 1,
                    text: '一般'
                },
                {
                    id: 2,
                    text: '很好'
                },
                {
                    id: 3,
                    text: '非常好'
                }
            ],
        }
    },
    created () {
      this.hotelInfo = this.$route.params.orderInfo
      console.log(this.hotelInfo)
    },
    methods: {
        handleSubmit(){
            if(!this.listQuery.commentSoft||!this.listQuery.commentService||!this.listQuery.commentBackground||!this.listQuery.commentContent||!this.listQuery.commentGrade){
                this.$message.warning('请完善评价信息！')
                return
            }
            let time = new Date()
            let year = time.getFullYear()
            let month = time.getMonth() + 1
            let day = time.getDate()
            let hours = time.getHours()
            let minutes = time.getMinutes()
            let seconds = time .getSeconds()
            time = year + '-' 
            + (month < 10 ? '0' + month : month) 
            + '-' + (day < 10 ? '0' + day : day) 
            + ' ' + (hours < 10 ? '0' + hours : hours) 
            + ':' + (minutes < 10 ? '0' + minutes : minutes)
            + ':' + (seconds < 10 ? '0' + seconds : seconds)
            let params = {
                ...this.listQuery,
                roomId: this.hotelInfo.roomId,
                commentName: this.$store.getters.userInfo.username,
                commentTime: time
            } 

            createHotelComments(params).then(res => {
                if(res.data.code == '200'){
                    this.$message.success("评价成功！")
                }else{
                    this.$message.success("评价失败！")
                }
            })
        }
    }
}
</script>

<style lang="scss">
.hotelEvaluate {
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
  .evaluateContainer{
      padding-bottom: 275px;
      background-color: #f5f5f5;
      .evaluateContent{
          max-width: 70em;
          margin: 0 auto 70px;
          padding-top: 30px;
          .evaluateBody{
              background-color: #fff;
              padding: 30px;
              .hotelInfo{
                  height: 500px;
                  display: flex;
                  align-items: center;
                  flex-direction: column;
                  justify-content: center;
                  border-right-color: #f5f5f5;
                  border-right-style: solid;
                  border-right-width: 1px;
                  .hotelImg{
                      width: 200px;
                      height: 150px;
                      img{
                          width: 100%;
                          height: 100%;
                      }
                  }
                  .hotelDetail{
                      text-align: center;
                      div{
                          margin: 10px 0;
                      }
                      .detailPrice{
                          font-size: 1.5rem;
                          font-weight: 500;
                      }
                  }
              }
              .evaluateInfo{
                  height: 480px;
                  padding: 0 30px;
                  p{
                    font-size: 0.9rem;
                    color: #fc982c;
                  }
                  .commonContainer{
                      display: flex;
                      padding: 20px 0;
                      .commonTitle{
                          width: 15%;
                      }
                      .commonContent{
                          flex: 1;
                          .textArea{
                              width: 70%;
                              min-height: 100px;
                              font-size: 1rem;
                          }
                          .el-radio-button__orig-radio:checked+.el-radio-button__inner{
                              background-color: #EC6916;
                              border-color: #EC6916;
                          }
                          .el-rate__icon {
                              font-size: 22px;
                          }
                          .el-rate__text {
                                font-size: 16px;
                            }
                      }
                  }
                  .evaluateCheck{
                      display: flex;
                      align-items: center;
                  }
              }
          }
          .evaluateFooter{
              height: 50px;
              padding: 30px;
              margin-top: 20px;
              background-color: #fff;
              text-align: center;
              .btn{
                  color: #fff;
                  width: 220px;
                  height: 48px;
                  background-color: #EC6916;
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
