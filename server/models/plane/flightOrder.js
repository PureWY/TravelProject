const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

//创建FlightSchema
var flightOrderSchema = new Schema({
    username: {type: String,trim: true},
    usercard: {type: String,trim: true},
    userphone: {type: Number,trim: true},
    startCity: {type: String,trim: true},
    endCity: {type: String,trim: true},
    startTime: {type: String},
    endTime: {type: String},
    flightName: {type: String,trim: true},
    planeId: {type: String,trim: true},
    siteType: {type: String, trim: true},
    checkPrice: {type: Number,trim: true}
  })

//创建model
var FlightOrder = mongoose.model('FlightOrder',flightOrderSchema);

module.exports = FlightOrder;