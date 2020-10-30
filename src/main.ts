import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";
import Tag from "@/components/money/Tag.vue";
// @ts-ignore
import EvaIcons from 'vue-eva-icons';
// @ts-ignore
import echarts from 'echarts'





Vue.use(EvaIcons)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts


Vue.component('Nav',Nav)
Vue.component('Layout',Layout)
Vue.component('Icon',Icon)
Vue.component('Tag',Tag)




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
