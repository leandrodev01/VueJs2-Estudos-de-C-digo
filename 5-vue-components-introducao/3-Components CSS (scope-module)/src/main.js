import Vue from 'vue'

import App from './App.vue'

//import AppContador from './AppContador.vue'

//Vue.component('app-contador', AppContador)

//import AppHeader from './AppHeader.vue'

//Vue.component('AppHeader', AppHeader)


new Vue({
 //el: '#app',
 render: h => h(App)
}).$mount('#app')
