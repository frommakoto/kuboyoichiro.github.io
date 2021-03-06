import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Question from 'components/Question'
import Dokaben from 'components/Dokaben'
import Manage from 'components/Manage'
import Login from 'components/Login'
import Screen from 'components/Screen'
import Ranking from 'components/Ranking'
import Ready from 'components/Ready'


Vue.use(Router)

export default new Router({
  routes: [
        {
          path: '/',
          name: 'Hello',
          component: Hello
        },
        {
          path: '/question',
          name: 'Question',
          component: Question
        },
        {
          path: '/dokaben',
          name: 'Dokaben',
          component: Dokaben
      },
      {
          path: '/manage',
          name: 'Manage',
          component: Manage
      },
      {
          path: '/login',
          name: 'Login',
          component: Login
      },
      {
          path: '/screen',
          name: 'Screen',
          component: Screen
      },
      {
          path: '/ranking',
          name: 'Ranking',
          component: Ranking
      },
      {
          path: '/ready',
          name: 'Ready',
          component: Ready
      }
  ]
})
