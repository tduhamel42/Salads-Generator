import Vue from 'vue'
import App from './App.vue'
import VueRessources from 'vue-resource'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
const vueConfig = require('vue-config')
const configs = {
  user: {}
}

Vue.use(vueConfig, configs)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRessources)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
