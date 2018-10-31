const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const stage = require('../config/config.js')

//创建UserSchema
var userSchema = new Schema({
    userName: {type: String,trim: true,unique: true},
    passWord: {type: String,trim: true},
    userPhone: {type: String,trim: true,unique: true},
    userBirth: {type: String},
    userHeadImg: {type: String},
    userIdCard: {type: String,trim: true,unique: true},
})

// 在保存用户信息之前加密密码
userSchema.pre('save', function(next) {
    const user = this;
    if(!user.isModified || !user.isNew) { //过滤掉旧的已加密的密码
      next();
    } else {
      bcrypt.hash(user.passWord, stage.saltingRounds, function(err, hash) {
        if (err) {
          console.log('未能成功加密密码！', user.passWord);
          next(err);
        } else {
          user.passWord = hash;
          next();
        }
      });
    }
  });

//创建model
var User = mongoose.model('User',userSchema);

module.exports = User;