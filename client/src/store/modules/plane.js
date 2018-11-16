const plane = {
    state: {
        queryInfo: {},
        orderInfo: {}
    },
    mutations: {
        UPDATE_QUERYINFO: (state,queryInfo) => {
            state.queryInfo = queryInfo
            queryInfo = JSON.stringify(queryInfo)
            window.localStorage.setItem('queryInfo',queryInfo)
        },
        GET_ORDERINFO: (state,orderInfo) => {
            state.queryInfo = orderInfo
            orderInfo = JSON.stringify(orderInfo)
            window.localStorage.setItem('orderInfo',orderInfo)
        }
    }
}

export default plane