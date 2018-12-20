const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//创建houseSchema
var roomSchema = new Schema({
    roomId: {type: String,trim: true,required: true},       //房间表Id
    singlePrice: {type: Number,trim: true},                 //单人间价格
    standardPrice: {type: Number,trim: true},               //标准间价格
    businessPrice: {type: Number,trim: true},               //商务间价格
    singleSurplus: {type: Number,trim: true},               //单人间余房
    standardSurplus: {type: Number,trim: true},             //标准间余房
    businessSurplus: {type: Number,trim: true},             //商务间余房
    singleImg: {type: String,trim: true},                   //单人间图片
    standardImg: {type: String,trim: true},                 //标准间图片
    businessImg: {type: String,trim: true},                 //商务间图片
    singleWindow: {type: Boolean,default: true},            //单人间是否有窗
    standardWindow: {type: Boolean,default: true},          //标准间是否有窗
    businessWindow: {type: Boolean,default: true},          //商务间是否有窗
    singleBed: {type: String,trim: true},                   //单人间床型
    standardBed: {type: String,trim: true},                 //标准间床型
    businessBed: {type: String,trim: true},                 //商务间床型
  })

//创建model
var HouseRoom = mongoose.model('HouseRoom',roomSchema);

module.exports = HouseRoom;