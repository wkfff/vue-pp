import './assets/styles/element-variables.scss'




import './assets/styles/currency.css'
import './assets/iconFont/iconfont.css'

import Vue from 'vue'
import router from './router'
import store from './store'


import http from './plugins/http.js'
import global from './plugins/Global.js'





import './plugins/element.js'


Vue.config.productionTip = false;
Vue.prototype.AXIOS = http.axios;
Vue.prototype.GLOBAL = global;



new Vue({
  store,
  // render: h => h(content)
  router,
  methods: {
    
  }
}).$mount('#app')