// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: {
    host: '192.168.1.71',
    port: 8000
  },
  css: ['~/assets/css/main.css'],
  ssr: true,
  modules: ['@nuxt/ui']
})