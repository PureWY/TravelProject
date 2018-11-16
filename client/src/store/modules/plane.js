const plane = {
    state: {
        queryInfo: {}
    },
    mutations: {
        UPDATE_QUERYINFO: (state,queryInfo) => {
            state.queryInfo = queryInfo
            queryInfo = JSON.stringify(queryInfo)
            window.localStorage.setItem('queryInfo',queryInfo)
        }
    }
}

export default plane