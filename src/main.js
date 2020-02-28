import Vue from 'vue'
import App from './App.vue'

// 导入全局过滤器
import "./utilis/filter.js"

// 路由导入
import router from "./router/index"
import store from "./store/store"

// 导入element-ui
import ElementUI from 'element-ui';
// 导入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';
// 注册element-ui
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
