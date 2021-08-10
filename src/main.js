import Vue from 'vue'
import App from './App.vue'

import moment from 'moment' 
moment.locale('ru', {
  week: {
    dow: 7
  }
})
Vue.prototype.$moment = moment

Vue.config.productionTip = false
Vue.config.ignoredElements = [/^ion-/]

new Vue({
  render: h => h(App),
}).$mount('#app')
