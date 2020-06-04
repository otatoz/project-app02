import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Article from '../pages/Article.vue'
import Category from '../pages/Category.vue'
import Comment from '../pages/Comment.vue'
import User from '../pages/User.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:'/article'
  },
  {
    path: '/article',
    name: 'Article',
    component: Article
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/comment',
    name: 'comment',
    component: Comment
  },
  {
    path: '/user',
    name: 'user',
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
