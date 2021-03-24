import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import state from './state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
// 调试工具
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  // state: {
  //   musiclist:[]
  //   // detailId:0
  //   // isShowLogin: false
  // },
  // mutations: {
  //   GETMUSICLIST(state,list) {
  //     state.musiclist = list
  //   }
  // },
  // actions: {

  // },
  // modules: {

  // },
  // getters: {
  //   musiclist: state => {
  //     return state.musiclist
  //   }
  // },
  strict: debug, //检查state的修改是否来自mutations
  plugins: debug ? [createLogger()] : []
})
