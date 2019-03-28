import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let types = {
    SET_AUTHENTICATED: "SET_AUTHENTICATED",
    SET_USER: "SET_USER"
}

let state = {
    isAuthenticated: false,
    user: {}
}

let getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user
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
    }
}
let actions = {
    setAuthenticated: ({ commit }, isAuthenticated) => {
        commit(types.SET_AUTHENTICATED, isAuthenticated);
    },
    setUser: ({ commit }, user) => {
        commit(types.SET_USER, user)
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