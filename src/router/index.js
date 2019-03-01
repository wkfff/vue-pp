import Vue from 'vue'
import Router from 'vue-router'

import logIn from '../lgoin.vue'

// const home = () => import( /* webpackChunkName: "group-foo" */ '../home.vue')
const home = () => import( /* webpackChunkName: "home" */ '../home.vue')
const myTask = () => import( /* webpackChunkName: "myTask" */ '../views/myTask/myTask.vue')
const madeByMe = () => import( /* webpackChunkName: "madeByMe" */ '../views/myTask/madeByMe.vue')
const schedule = () => import( /* webpackChunkName: "schedule" */ '../views/myTask/schedule.vue')
const projectManage = () => import( /* webpackChunkName: "projectManage" */ '../views/project/projectManage.vue')





const project = () => import( /* webpackChunkName: "project" */ '../views/project/project.vue')






let router = new Router({
  linkActiveClass: 'menu_item_active',
  linkExactActiveClass: 'menu_item_active',
  routes: [{
      path: '',
      component: logIn
    },
    {
      path: '/login',
      name: 'login',
      component: logIn
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [{
        path: 'myTask',
        component: myTask,
        children: [{
          path: 'madeByMe',
          name: 'madeByMe',
          component: madeByMe
        }, {
          path: 'schedule',
          name: 'schedule',
          component: schedule
        }]
      }, {
        path: 'projectManage',
        name: 'projectManage',
        component: projectManage,
      }, {
        path: 'project',
        name: 'project',
        component: project,
      }]
    }
  ]
})




router.beforeEach((to, from, next) => {

  next()
})


// router.afterEach((to, from) => {

// })

Vue.use(Router)
export default router