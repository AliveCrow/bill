import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import money from "@/components/Money.vue";
import labels from "@/components/Labels.vue";
import statistics from "@/components/Statistics.vue";
import NotFound from "@/components/NotFound.vue";

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
    component:NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
