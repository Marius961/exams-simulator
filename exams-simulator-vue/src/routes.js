import VueRouter from 'vue-router'
import home from './pages/home'
import constructor from './pages/testsConstructor'
import testingPage from './components/testingSegment'
export default new VueRouter({
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/constructor',
      component: constructor
    }
  ],
  mode: 'history'
})
