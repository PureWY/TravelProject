const getters = {
    token: state => state.user.token,
    expiredTime: state => state.user.expiredTime,
    name: state => state.user.name,
}

export default getters