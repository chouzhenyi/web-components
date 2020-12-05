import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  CheckboxGroup,
  Checkbox,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
} from 'element-ui'
Vue.component(Checkbox.name, Checkbox);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(Input.name, Input)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(RadioButton.name, RadioButton)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(OptionGroup.name, OptionGroup)
Vue.component(Button.name, Button)
Vue.component(ButtonGroup.name, ButtonGroup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
