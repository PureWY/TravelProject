import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import plane from './modules/plane'
import getters from './getters'

Vue.use(Vuex);

const store = new Vuex.Store({
    // ...
    modules: {
        user,
        plane
    },
    getters
})

export default store