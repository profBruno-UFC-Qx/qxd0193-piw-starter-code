import './assets/main.css'
// Import our custom CSS
import './assets/scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { createApp } from 'vue'
import { router } from '@/router'
import App from './App.vue'


createApp(App)
  .use(router)
  .mount('#app')