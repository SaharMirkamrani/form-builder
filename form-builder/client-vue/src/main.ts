import { createApp } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from './App.vue';
import './style.css';
import 'vuetify/styles'

// Vuetify imports
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.use(Toast)
app.use(vuetify)
app.mount('#app')
