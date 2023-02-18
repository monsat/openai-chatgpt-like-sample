// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@anu-vue/nuxt',
  ],
  css: [
    '@anu-vue/preset-theme-default/dist/style.css',
  ],
  runtimeConfig: {
    openaiApiKey: '',
  },
})
