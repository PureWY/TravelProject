const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//创建houseSchema
var carSchema = new Schema({
    carId: {type: String,trim: true,required: true},       //汽车Id
    carName: {type: String,trim: true},                    //汽车名称
    carEngName: {type: String,trim: true},                 //汽车英文名称
    carDetailPlace: {type: String,trim: true},             //汽车具体位置
    carType: {type: String,trim: true},                    //汽车类型
    carSites: {type: Number,trim: true},                   //汽车可乘坐座位数
    carBaggages: {type: Number,trim: true},                //汽车可置放行李数
    carOil: {type: Number,trim: true},                     //汽车燃油量
    carAuto: {type: String,trim: true},                    //汽车是否自动挡
    carPrice: {type: Number,trim: true},                   //汽车日租价格
    carCity: {type: String,trim: true},                    //汽车所在城市
    carHaveMotion: {type: String,trim: true},              //汽车是否有空调
    carHaveWindow: {type: String,trim: true},              //汽车是否有天窗
    carForFunc: {type: String,trim: true},                 //汽车用途
    carHaveLimit: {type: String,trim: true},               //汽车是否有里程限制
    carImg: {type: String,trim: true},                     //汽车图片
    carTransit: {type: Array,default: []},                 //汽车经纬度
    carDoorType: {type: String,trim: true},                //汽车车门类型
    carGetPlace: {type: String,trim: true},                //汽车接送点
    carDoorNum: {type: Number,trim: true},                //汽车车门数
    carOliType: {type: String,trim: true},                //汽车燃油类型
    carBoxType: {type: String,trim: true},                //汽车变速箱类型
    carDisplacement: {type: Number,trim: true},            //汽车排量
    carPrime: {type: String,trim: true},                  //汽车驱动类型
    carEnterprising: {type: String,trim: true},           //汽车进气类型
    carWindowType: {type: String,trim: true},             //汽车天窗类型
    carBackRadar: {type: String,trim: true},              //汽车倒车雷达
    carGPS: {type: String,trim: true},                    //汽车GPS导航
  })

//创建model
var Car = mongoose.model('Car',carSchema);

module.exports = Car;