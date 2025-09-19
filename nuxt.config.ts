export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  typescript: {
    strict: true,
    typeCheck: true
  },
  
  app: {
    head: {
      title: 'Nuxt 4 Sticker App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Awesome Nuxt 4 application with stickers' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})