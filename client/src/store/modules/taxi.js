const taxi = {
    state: {
        queryTaxi: '',
        orderTaxi: {}
    },
    mutations: {
        UPDATE_QUERYTAXI: (state,queryTaxi) => {
            state.queryTaxi = queryTaxi
            window.sessionStorage.setItem('queryTaxi',queryTaxi)
        },
        GET_ORDERHOTEL: (state,orderTaxi) => {
            state.orderTaxi = orderTaxi
            orderTaxi = JSON.stringify(orderTaxi)
            window.sessionStorage.setItem('orderTaxi',orderTaxi)
        }
    }
}

export default hotel