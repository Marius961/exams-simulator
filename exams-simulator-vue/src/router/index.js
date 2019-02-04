import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Constructor from '../pages/TestsConstructor'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/constructor',
      component: Constructor
    }
  ],
  mode: 'history',
  base: '/exams-simulator/experimental/'
})
