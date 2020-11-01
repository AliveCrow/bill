import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import money from "@/views/Money.vue";
import labels from "@/views/Labels.vue";
import statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect:'/money'
  },
  {
    path:'/money',
    name:'money',
    component: money
  },
  {
    path:'/labels',
    name:'labels',
    component: labels
  },
  {
    path:'/statistics',
    name:'statistics',
    component: statistics
  },
  {
    path:'*',
    name:'NotFound',
    component:NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
