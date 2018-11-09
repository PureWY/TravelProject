const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

//创建FlightSchema
var flightSchema = new Schema({
    startCity: {type: String,trim: true},
    endCity: {type: String,trim: true},
    startTime: {type: String,trim: true},
    endTime: {type: String,trim: true},
    flightName: {type: String,trim: true},
    planeId: {type: String,trim: true},
  })


//创建model
var Flight = mongoose.model('Flight',flightSchema);

module.exports = Flight;