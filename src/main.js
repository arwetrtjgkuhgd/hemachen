import Vue from 'vue'
import App from './App.vue'

// 路由导入
import router from "./router/index"

// 导入element-ui
import ElementUI from "element-ui"
// 导入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
// 注册element-ui
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
