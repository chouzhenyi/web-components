import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  CheckboxGroup,
  Checkbox,
} from 'element-ui'
Vue.component(Checkbox.name, Checkbox);
Vue.component(CheckboxGroup.name, CheckboxGroup);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
