// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  tailwindcss: {
    config: {
      theme: {
      }
    }
  },
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "经典老黄历日历" }
      ],
      title: "通胜日历",
      script: [],
      link: [
        { rel: "icon", href: "/loading.gif", type: "image/gif" },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css' },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:wght@100..900&display=swap" },
      ],
      style: [
        { children: "@font-face { font-family: 'KuiBenZhenShu'; src: url(/fonts/AaKuiBenZhenShu-2.ttf) }" },
        { children: "body { font-family: 'Fraunces', 'KuiBenZhenShu', 'Microsoft JhengHei' }" }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})