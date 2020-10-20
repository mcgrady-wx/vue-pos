// 创建vuex仓库

//导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
//注册 vuex
Vue.use(Vuex)

import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'



//创建vuex实例
const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})

export default store