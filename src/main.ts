import 'vuetify/styles' // Global CSS has to be imported
import { createApp } from 'vue';
import { createVuetify } from 'vuetify'
import { createPinia } from 'pinia';

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue';
import router from './router';

import './index.css'
import './assets/main.css';

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
})

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
