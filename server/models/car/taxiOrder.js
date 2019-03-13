const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//创建HouseOrderSchema
var carOrderSchema = new Schema({
    carName: {type: String,trim: true},         //车辆名称
    carId: {type: String,trim: true},           //车辆Id
    username: {type: String,trim: true},        //用户名
    usercard: {type: String,trim: true},        //用户身份证号
    userphone: {type: Number,trim: true},       //用户联系电话
    hireTime: {type: Array,default: []},        //住宿时间
    allTime: {type: Number,trim: true},         //合计住宿时间
    allPrice: {type: Number,trim: true},        //合计价格
    carCity: {type: String,trim: true},         //租车城市
  })

//创建model
var CarOrder = mongoose.model('CarOrder',carOrderSchema);

module.exports = CarOrder;