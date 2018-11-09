const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

//创建FlightSchema
var planeSchema = new Schema({
    plantId: {type: String,trim: true,required: true},
    firstClassPrice: {type: Number,trim: true},
    secondClassPrice: {type: Number,trim: true},
    thirdClassPrice: {type: Number,trim: true},
    firstClassSite: {type: Number,trim: true},
    secondClassSite: {type: Number,trim: true},
    thirdClassSite: {type: Number,trim: true},
    allSite: {type: Number,trim: true}
  })

//创建model
var Plane = mongoose.model('Plane',planeSchema);

module.exports = Plane;