const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//创建houseSchema
var houseSchema = new Schema({
    roomId: {type: String,trim: true,required: true},       //房间表Id
    commentId: {type: String,trim: true,required: true},    //评论表Id
    houseName: {type: String,trim: true},                   //酒店名称
    houseStar: {type: Number,trim: true},                   //酒店星级
    housePhone: {type: Number,trim: true},                  //酒店电话
    houseTag: {type: String,trim: true},                    //酒店标签类型
    houseGrade: {type: Number,trim: true},                  //酒店评分
    houseCityPlace: {type: String,trim: true},              //酒店所属市
    houseAreaPlace: {type: String,trim: true},              //酒店所属区
    houseDetailPlace: {type: String,trim: true},            //酒店详细位置
    houseType: {type: String,trim: true},                   //酒店住宿类型
    houseFreeSer: {type: Array,default: []},                //酒店提供服务种类
    houseImg: {type: String, trim: true},                   //酒店图片
    houseDataFrom: {type: String,trim: true},               //酒店数据来源
    inHouseTime: {type: String,trim: true},                 //入店时间
    outHouseTime: {type: String,trim: true},                //离店时间
    houseEngName: {type: String,trim: true},                //酒店英文名
    houseStandard: {type: String,trim: true},               //酒店标准
    houseIntelligence: {type: String,trim: true},           //酒店执照
    houseCreateTime: {type: String,trim: true},             //酒店创建时间
    houseRooms: {type: Number,trim: true},                  //酒店房间数
    houseInfo: {type: String,trim: true},                   //酒店信息
    transit: {type: Array,default: []}                      //酒店经纬度
  })

//创建model
var House = mongoose.model('House',houseSchema);

module.exports = House;