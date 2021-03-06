const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//创建houseSchema
var commentSchema = new Schema({
    commentId: {type: String,trim: true,required: true},        //评论表Id
    commentName: {type: String,default: true},                  //评论用户名
    commentTime: {type: String,trim: true},                     //评论时间
    commentContent: {type: String,trim: true},                  //评论内容
    commentGrade: {type: Number,trim: true},                    //评价分数
    commentSoft: {type: String,trim: true},                    //评价舒适度
    commentBackground: {type: String,trim: true},              //评价周边环境
    commentService: {type: String,trim: true},                 //评价服务态度
  })

//创建model
var HouseComment = mongoose.model('HouseComment',commentSchema);

module.exports = HouseComment;