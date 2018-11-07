const getters = {
    token: state => state.user.token,
    loginTime: state => state.user.loginTime,
    userphone: state => state.user.userphone,
}

export default getters