const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//创建houseSchema
var roomSchema = new Schema({
    roomId: {type: String,trim: true,required: true},       //房间表Id
    singleRoom: {type: Array,default: []},                     //单人间
    standardRoom: {type: Array,default: []},                   //标准间
    businessRoom: {type: Array,default: []},                   //商务间
  })

//创建model
var HouseRoom = mongoose.model('HouseRoom',roomSchema);

module.exports = HouseRoom;