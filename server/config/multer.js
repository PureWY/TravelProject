const multer = require('multer')
const jwt = require('./jwt')

const storage = multer.diskStorage({
  //上传图片的路径
  destination: 'public/uploadImg',
  //给上传文件重命名，获取添加后缀名
  filename: function(req, file, callback) {
    let userphone = jwt.verifyToken(req.headers._tk).payload.userphone
    //把图片命名为当前登陆的用户名
    let date = Date.now()
    callback(null, userphone + `${date}.jpg`);
  }
})
//导出模块
module.exports = multer({
  storage
})