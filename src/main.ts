import { createApp } from 'vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

import App from './App.vue'
import './App.less'

const app = createApp(App)

app.use(router)

app.use(Antd)

app.mount('#app')
