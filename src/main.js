import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { ref } from 'vue'

const app = createApp(App)
app.config.globalProperties.$GAME_CONTROLLER = ref(null)
app.mount('#app')
