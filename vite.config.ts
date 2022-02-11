import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#2d8cf0',
          'link-color': '#2d8cf0',
          'heading-color': '#17233d',
          'text-color': '#515a6e',
          'text-color-secondary': '#808695',
          'disabled-color': '#c5c8ce',
          'border-color-base': '#dcdee2',
          'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
  },
  plugins: [vue()]
})
