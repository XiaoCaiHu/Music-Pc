import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from './axios'
import './common/scss/icon.scss'
import './common/scss/reset.scss'
import './plugins/element.js'


// 使用懒加载
Vue.use(VueLazyLoad,{
  // 加载时的图片
  loading: require('assets/logo2.jpg')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
