const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//创建HouseOrderSchema
var houseOrderSchema = new Schema({
    roomId: {type: String,trim: true},
    engName: {type: String,trim: true},
    username: {type: String,trim: true},
    usercard: {type: String,trim: true},
    userphone: {type: Number,trim: true},
    time: {type: Array,default: []},
    allTime: {type: Number,trim: true},
    allPrice: {type: Number,trim: true},
    allAmount: {type: Number,trim: true}
  })

//创建model
var HouseOrder = mongoose.model('HouseOrder',houseOrderSchema);

module.exports = HouseOrder;