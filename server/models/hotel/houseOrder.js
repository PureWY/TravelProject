const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//创建HouseOrderSchema
var houseOrderSchema = new Schema({
    houseName: {type: String,trim: true},     //酒店名称
    roomId: {type: String,trim: true},        //房间Id
    houseImg: {type: String, trim: true},     //酒店图片
    name: {type: String,trim: true},          //房间类型名称
    engName: {type: String,trim: true},       //房间类型英文名
    username: {type: String,trim: true},      //用户名
    usercard: {type: String,trim: true},      //用户身份证号
    userphone: {type: Number,trim: true},     //用户联系电话
    time: {type: Array,default: []},          //住宿时间
    allTime: {type: Number,trim: true},       //合计住宿时间
    allPrice: {type: Number,trim: true},      //合计价格
    allAmount: {type: Number,trim: true}      //合计房间数
  })

//创建model
var HouseOrder = mongoose.model('HouseOrder',houseOrderSchema);

module.exports = HouseOrder;