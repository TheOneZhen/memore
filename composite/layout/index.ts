import { createApp } from 'vue'
import { createPinia } from 'pinia'
import MemoreLayout from './src/Layout.vue'
import 'virtual:uno.css'

const AppInstance = createApp(MemoreLayout)
const pinia = createPinia()

AppInstance.use(pinia)

export default AppInstance
