const getters = {
    token: state => state.user.token,
    loginTime: state => state.user.loginTime,
    username: state => state.user.username,
}

export default getters