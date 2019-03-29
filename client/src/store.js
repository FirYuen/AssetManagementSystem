import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let types = {
    SET_AUTHENTICATED: "SET_AUTHENTICATED",
    SET_USER: "SET_USER",
    SET_ECHART:"SET_ECHART"
}

let state = {
    isAuthenticated: false,
    user: {},
    linechartData:[[], []]
}

let getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
    linechartData :state=>state.linechartData
}
let mutations = {
    [types.SET_AUTHENTICATED](state, isAuthenticated) {
        if (isAuthenticated) { state.isAuthenticated = isAuthenticated; }
        else {
            state.isAuthenticated = false;
        }
    },
    [types.SET_USER](state,user){
        if (user) {
            state.user = user
        }else{
            state.user = {}
        }
    },
    [types.SET_ECHART](state,data){
        if (data) {
            state.linechartData = data
        }else{
            state.linechartData= []
        }
    }
}
let actions = {
    setAuthenticated: ({ commit }, isAuthenticated) => {
        commit(types.SET_AUTHENTICATED, isAuthenticated);
    },
    setUser: ({ commit }, user) => {
        commit(types.SET_USER, user)
    },
    setLineChartData: ({ commit }, linechartData) => {
        commit(types.SET_ECHART,linechartData)
    },
    clearCurrentState:({commit})=>{
        commit(types.SET_AUTHENTICATED,false)
        commit(types.SET_USER,{})
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})