const hotel = {
    state: {
        queryHotel: {},
        orderHotel: {}
    },
    mutations: {
        UPDATE_QUERYHOTEL: (state,queryHotel) => {
            state.queryHotel = queryHotel
            queryHotel = JSON.stringify(queryHotel)
            window.localStorage.setItem('queryHotel',queryHotel)
        },
        GET_ORDERHOTEL: (state,orderHotel) => {
            state.queryInfo = orderHotel
            orderHotel = JSON.stringify(orderHotel)
            window.localStorage.setItem('orderHotel',orderHotel)
        }
    }
}

export default hotel