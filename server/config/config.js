//连接数据库
module.exports = {
    mongodb: 'mongodb://localhost:27017/index',
    saltingRounds: 10,
    secretOrKey: "secret",
    tokenTime: 60 * 60 * 1
}