import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)



import projectList from './modules/projectList'


export default new Vuex.Store({
  modules:{
    projectList
  }
});
