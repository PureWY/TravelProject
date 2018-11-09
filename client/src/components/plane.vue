<template>
  <div class="planeContainer">
    <div class="photoContent">
      <section class="photoFont">
        <div class="fontStyle">
          <h2 class="title">同时搜索数百家旅游网站</h2>
        </div>
      </section>
      <section class="airPlaneSearch">
            <div class="airPlaneContent">
                <div class="airPlaneTab">
                    <div class="goAndBack">
                        
                    </div>
                    <div class="ridePeople">
                       
                    </div>
                    <div class="rideType">
                        
                    </div>
                </div>
                <div class="airPlaneSelect">
                    <el-form :inline="true" class="queryForm">
                    <el-form-item>
                        <el-select clearable  filterable v-model="listQuery.startCity" placeholder="出发地">
                        <el-option class="placeSelect" v-for="city in cityList" :key="city"  :label="city" :value="city"></el-option>
                        </el-select>
                    </el-form-item>
                    <div @click="handleSwitchPlace" class="switchPlace">
                        <img src="../assets/img/switchPlace.png">
                    </div>
                    <el-form-item>
                        <el-select clearable  v-model="listQuery.endCity" placeholder="目的地">
                        <el-option class="placeSelect" v-for="city in cityList" :key="city"  :label="city" :value="city"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                        class="datePicker"
                        v-model="listQuery.searchTime"
                        type="daterange"
                        align="right"
                        value-format="yyyy-MM-dd"
                        unlink-panels
                        range-separator="|"
                        start-placeholder="出发日期"
                        end-placeholder="返程日期"
                        :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="queryBtn" @click="handleSearch"><img src="../assets/img/query.png"></el-button>
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
    getSiteType,
    queryFlight
} from '../api/plane/index.js'
import {
    getCityList
} from '../api/common/index.js'
export default {
  name: 'planeComponent',
  data() {
    return {
        listQuery: {
            startCity: '',
            endCity: '',
            searchTime: ''
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
            value7: '',
            cityList: [],
            siteType: '',
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
          if(!this.listQuery.startCity){
              this.$message({
                message: '请选择出发地',
                type: 'warning'
                });
          }else if(!this.listQuery.endCity){
              this.$message({
                message: '请选择目的地',
                type: 'warning'
                });
          }else if(!this.listQuery.searchTime){
              this.$message({
                message: '请选择查询日期',
                type: 'warning'
                });
          }else{
              queryFlight(this.listQuery).then(res => {
                  if(res.data.code == 200){
                      this.$message({
                        message: res.data.message,
                        type: 'success'
                        });
                  }
            }).catch((err) => {
                this.$message({
                message: err.data.message,
                type: 'warning'
                });
            })
          }
      },
      handleSwitchPlace(){
          [this.listQuery.startCity,this.listQuery.endCity] = [this.listQuery.endCity,this.listQuery.startCity]
      }
  }
}
</script>

<style lang="scss">
.planeContainer {
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
        .title{
            font-family: "Forza-Black",Helvetica,Arial,sans-serif;
            font-weight: 800;
            text-align: left;
            color: #fff;
            font-size: 38px;
        }
      }
    }
    .airPlaneSearch{
        width: 100%;
        background-color: #e9451a;
        .airPlaneContent{
            margin: 0 auto;
            max-width: 70em;
            height: 195px;
            .airPlaneTab{
                height: 15%;
                display: flex;
                padding: 30px 0 0;
                .el-dropdown-link{
                display: inline-block;
                position: relative;
                cursor: pointer;
                color: #fff;
                font-size: 15px;
                font-weight: 500;
                } 
                .ridePeople{
                    margin-left: 30px;
                }
                .rideType{
                    margin-left: 30px;
                }
            }
            .airPlaneSelect{
                height: 100px;
                display: flex;
                .switchPlace{
                    width: 55px;
                    height: 40px;
                    display: inline-block;
                    background-color: #EC744F;
                    border-radius: 1px;
                    padding-top: 15px;
                    text-align: center;
                    cursor: pointer;
                }
                .queryForm{
                    .el-form-item {
                        height: 55px;
                        margin-bottom: 0;
                        margin-right: 0;
                        .datePicker{
                            width: 500px;
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
                        .el-select-dropdown__item{
                            height: 50px;
                            padding: 6px 20px;
                        }
                    }
                }
                
            }
        }
    }
  }
}
</style>

