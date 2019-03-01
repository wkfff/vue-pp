import './assets/styles/element-variables.scss'




import './assets/styles/currency.css'
import './assets/iconFont/iconfont.css'

import Vue from 'vue'
import router from './router'
import store from './store'


import axios from './axios'
import global from './plugins/Global.js'


import './directives'

import './element-ui'



import * as filters from './filters'

console.log(filters)

// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })



Vue.config.productionTip = false;
Vue.prototype.AXIOS = axios.axios;
Vue.prototype.GLOBAL = global;
Vue.prototype.FILTERS = filters;



new Vue({
  store,
  // render: h => h(content)
  router,
  methods: {

  }
}).$mount('#app')