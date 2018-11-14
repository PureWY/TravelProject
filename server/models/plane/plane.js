const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

//创建FlightSchema
var planeSchema = new Schema({
    planeId: {type: String,trim: true,required: true},     //飞机编号
    firstClassPrice: {type: Number,trim: true},            //经济舱价格
    secondClassPrice: {type: Number,trim: true},           //商务舱价格
    thirdClassPrice: {type: Number,trim: true},            //头等舱价格
    firstClassSite: {type: Number,trim: true},             //经济舱座位
    secondClassPrice: {type: Number,trim: true},           //商务舱座位
    thirdClassPrice: {type: Number,trim: true},            //头等舱座位
    allSite: {type: Number,trim: true},                    //总座位
    siteType: {type: Array, default: []},                  //选择的座位类型
    checkPrice: {type: Number,trim: true}                  //选择的价格
  })

//创建model
var Plane = mongoose.model('Plane',planeSchema);

module.exports = Plane;