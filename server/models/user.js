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
})

// 在保存用户信息之前加密密码
userSchema.pre('save', function(next) {
  const user = this;
  if(!user.isModified || !user.isNew) { //过滤掉旧的已加密的密码
    next();
  } else {
    bcrypt.hash(user.password, stage.saltingRounds, function(err, hash) {
      if (err) {
        console.log('未能成功加密密码！', user.password);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

//创建model
var User = mongoose.model('User',userSchema);

module.exports = User;