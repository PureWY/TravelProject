<template>
  <div class="hotelContainer">
    <div class="photoContent">
      <section class="photoFont">
        <div class="fontStyle">
          <h2 class="title">同时搜索数百家旅游网站</h2>
        </div>
      </section>
      <section class="hotelSearch">
            <div class="hotelContent">
                <div class="hotelTab">
                    <div class="goAndBack">
                        <el-dropdown trigger="click"> 
                        <span class="el-dropdown-link">
                            1间房，2名旅客
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>2间房，4名旅客</el-dropdown-item>
                            <el-dropdown-item>3间房，6名旅客</el-dropdown-item>
                            <el-dropdown-item>4间房，8名旅客</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div class="hotelSelect">
                    <el-form :inline="true" :model="formInline" class="queryForm">
                    <el-form-item>
                        <el-select class="placePicker" clearable  filterable v-model="listQuery.sleepCity" placeholder="住宿地">
                        <el-option class="placeSelect" v-for="city in cityList" :key="city"  :label="city" :value="city"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                        class="datePicker"
                        v-model="listQuery.sleepDate"
                        type="daterange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd"
                        range-separator="|"
                        start-placeholder="住店日期"
                        end-placeholder="离店日期"
                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="queryBtn" @click="handleSearch"><img src="../../../assets/img/query.png"></el-button>
                    </el-form-item>
                    </el-form>
                </div>
            </div>
      </section>
    </div>
  </div>
</template>

<script>
import {
    getCityList
} from '../../../api/common/index.js'
import {
    queryHotel
} from '../../../api/hotel/index.js'
export default {
  name: 'hotelComponent',
  data() {
    return {
      formInline: {
                user: '',
                region: ''
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            cityList: [],
            listQuery: {
                sleepCity: '',
                sleepDate: null
            }
    }
  },
    created() {
      this.getCityLists()
  },
  methods: {
      getCityLists(){
          getCityList().then(res => {
              this.cityList = res.data.body.cityList;
          })
      },
      handleSearch() {
          if(!this.listQuery.sleepCity){
              this.$message({
                message: '请选择住宿地',
                type: 'warning'
                });
          }else if(!this.listQuery.sleepDate){
              this.$message({
                message: '请选择住宿日期',
                type: 'warning'
                });
          }else{
              let parmas = {
                  houseCityPlace: this.listQuery.sleepCity
              }
              queryHotel(parmas).then(res => {
                  if(res.data.code == 200){
                      this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                      this.$store.commit('UPDATE_QUERYHOTEL',this.listQuery)
                      this.$router.push('house/houseInfo')
                  }else{
                      this.$message({
                            message: res.data.message,
                            type: 'warning'
                        });
                  }
            }).catch((err) => {
                console.log(err)
            })
          }
      },

  }
}
</script>

<style lang="scss">
.hotelContainer {
  width: 100%;
  margin-top: -3px;
  background-color: #e9451a;
  .photoContent {
    margin: 0 auto;
    max-width: 70em;
    .photoFont {
      height: 81px;
      .fontStyle {
        display: flex;
        align-items: flex-end;
        padding: 0px;
        .title{
            font-family: "Forza-Black",Helvetica,Arial,sans-serif;
            font-weight: 800;
            text-align: left;
            color: #fff;
            font-size: 38px;
        }
      }
    }
    .hotelSearch{
        width: 100%;
        background-color: #e9451a;
        .hotelContent{
            margin: 0 auto;
            max-width: 70em;
            height: 195px;
            .hotelTab{
                height: 20%;
                padding: 30px 0px 0px;
                display: flex;
                .el-dropdown-link{
                display: inline-block;
                position: relative;
                cursor: pointer;
                color: #fff;
                font-size: 15px;
                font-weight: 500;
                }
            }
            .hotelSelect{
                height: 100px;
                padding: 0px;
                display: flex;
                .queryForm{
                    .el-form-item {
                        height: 55px;
                        margin-bottom: 0;
                        margin-right: 0;
                        .datePicker{
                            width: 495px;
                        }
                        .placePicker{
                            width: 490px;
                        }
                        .el-input__inner{
                            height: 55px;
                            background-color: #EC744F;
                            border: none;
                            border-radius: 1px;
                            color: #fff;
                            font-weight: 500;
                        }
                        .el-range-input{
                            color: #fff;
                            font-weight: 500;
                            background-color: #EC744F;
                            padding-left: 20px;
                            text-align: left;
                        }
                        .el-input__inner::-webkit-input-placeholder{
                            color: #FAE4DD;
                            font-weight: 500;
                        }
                        .el-range-input::-webkit-input-placeholder{
                            color: #FAE4DD;
                            font-weight: 500;
                        }
                        .el-input__inner::-moz-placeholder{
                            color: #FAE4DD;
                            font-weight: 500;
                        }
                        .el-input__inner::placeholder{
                            color: #FAE4DD;
                            font-weight: 500;
                        }
                        .el-range-input::-moz-placeholder{
                            color: #FAE4DD;
                            font-weight: 500;
                        }
                        .el-range-input::placeholder{
                            color: #FAE4DD;
                            font-weight: 500;
                        }
                        .el-range-editor--medium .el-range-separator {
                            line-height: 49px;
                            font-size: 14px;
                            color: #fff;
                            font-weight: 500;
                        }
                        .el-select .el-input .el-select__caret{
                            color: #fff;
                            font-size: 20px;    
                        }
                        .el-date-editor .el-range__icon{
                            color: #fff;
                            font-size: 20px;   
                        }
                        .queryBtn{
                            width: 55px;
                            height: 55px;
                            background-color: #fff;
                            padding: 0;
                            border-radius: 3px;
                        }
                    }
                }
                
            }
        }
    }
  }
}
</style>

