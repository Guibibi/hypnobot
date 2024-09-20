// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/i18n',
    'radix-vue',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint'
  ]
})