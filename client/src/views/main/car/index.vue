<template>
  <div class="carContainer">
    <div class="photoContent">
      <section class="photoFont">
        <div class="fontStyle">
          <h2 class="title">同时搜索数百家旅游网站</h2>
        </div>
      </section>
      <section class="carSearch">
            <div class="carContent">
                <div class="carTab">
                    <div class="goAndBack">
                        <span class="el-dropdown-link">
                            相同还车地点
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                    </div>
                </div>
                <div class="carSelect">
                    <el-form :inline="true" :model="listQuery" class="queryForm">
                    <el-form-item>
                        <el-select clearable class="placePicker"  filterable v-model="listQuery.hireCity" placeholder="租车点">
                            <el-option class="placeSelect" v-for="city in cityList" :key="city"  :label="city" :value="city"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                        class="datePicker"
                        v-model="listQuery.hireTime"
                        type="datetimerange"
                        align="right"
                        unlink-panels
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="|"
                        start-placeholder="租车日期"
                        end-placeholder="还车日期"
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
    queryTaxi
} from '../../../api/taxi/index.js'
export default {
  name: 'carComponent',
  data() {
    return {
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
        listQuery: {
            hireCity: '',
            hireTime: []
        },
        cityList: [],
    }
  },
  created () {
    this.getCityLists()  
  },
  methods: {
      getCityLists(){
          getCityList().then(res => {
              this.cityList = res.data.body.cityList;
          })
      },
      handleSearch() {
            if(!this.listQuery.hireCity){
              this.$message({
                message: '请选择租车点',
                type: 'warning'
                });
          }else if(!this.listQuery.hireTime){
              this.$message({
                message: '请选择租车日期',
                type: 'warning'
                });
          }else{
              let parmas = {
                  taxiCity: this.listQuery.hireCity
              }
              queryTaxi(parmas).then(res => {
                  if(res.data.code == 200){
                      this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                      sessionStorage.setItem('taxiCity',this.listQuery.hireCity)
                      sessionStorage.setItem('hireTime',this.listQuery.hireTime)
                      this.$router.push('taxi/taxiInfo')
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
        }
  }
}
</script>

<style lang="scss">
.carContainer {
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
    .carSearch{
        width: 100%;
        background-color: #e9451a;
        .carContent{
            margin: 0 auto;
            max-width: 70em;
            height: 195px;
            .carTab{
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
            .carSelect{
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



