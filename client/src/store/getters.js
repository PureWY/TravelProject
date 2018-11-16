const getters = {
    token: state => state.user.token,
    loginTime: state => state.user.loginTime,
    userphone: state => state.user.userphone,
    userInfo: state => state.user.userInfo,
    queryInfo: state => state.plane.queryInfo
}

export default getters