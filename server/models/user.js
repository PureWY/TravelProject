const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const stage = require('../config/config.js')

//创建UserSchema
var userSchema = new Schema({
  userphone: {type: Number,trim: true,unique: true,required: true},
  password: {type: String,trim: true,required: true},
  username: {type: String,trim: true},
  usercard: {type: String,trim: true},
  useraddress: {type: String,trim: true},
  usersign: {type: String,trim: true},
})

//加密密码
function encryptPass(next) {
  let user = this;
  if(user._update){
    user = user._update
  }
  bcrypt.hash(user.password, stage.saltingRounds, function(err, hash) {
    if (err) {
      console.log(err)
      next(err);
    } else {
      user.password = hash;
      next();
    }
  }); 
}

// 在保存用户信息之前加密密码
userSchema.pre('save', encryptPass);
userSchema.pre('update', encryptPass);

//创建model
var User = mongoose.model('User',userSchema);

module.exports = User;