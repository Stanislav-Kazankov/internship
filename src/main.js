import Vue from 'vue'
import App from './App.vue'
import Sidebar from './Sidebar.vue'
import MenuItem from './MenuItem.vue'
import Vue2Scrollbar from './Vue2Scrollbar.vue'
require("./Vue2Scrollbar.css")
import Submenu from './Submenu.vue'

Vue.component('app-sidebar', Sidebar);
Vue.component('app-menu-item', MenuItem);
Vue.component('app-scrollbar', Vue2Scrollbar);
Vue.component('app-submenu', Submenu);

new Vue({
  el: '#app',
  render: h => h(App)
})
