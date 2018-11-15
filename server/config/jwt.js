const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
// 创建 token 类
module.exports = {
    //生成token
    generateToken(userphone) {
        //创建token
        const payload = { userphone: userphone };
        const options = { expiresIn: config.tokenTime};
        const secret = config.secretOrKey;
        const token = jwt.sign(payload, secret, options);

        return token
    },

    // 校验token
    verifyToken(token) {
        let res;
        try {
            res = jwt.decode(token, { complete: true }) || {};
        } catch (e) {
            res = 'err';
        }
        return res;
    }

}
