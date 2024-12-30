// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  alias: {
    "~": ".",
  },
  tailwindcss: {
    config: {
      theme: {
        colors: {
          green: "#267F00",
          white: "white",
          black: "black"
        },
        extend: {
          dropShadow: {
            'green': [
              '3px 2px 0 white',
              '3px 2px 0 #267F00',
            ],
          }
        },
        fontFamily: {
          "sans-serif": "'Noto Sans HK'"
        }
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
      link: [
        { rel: "icon", href: "favicon.png", type: "image/png" },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css' },
        { rel: "preconnect", href: "https://fonts.bunny.net" },
        { rel: "stylesheet", href: "https://fonts.bunny.net/css?family=lxgw-wenkai-tc:400,700" },
        { rel: "stylesheet", href: "https://fonts.bunny.net/css?family=noto-sans-hk:400,700" },
        { rel: "stylesheet", href: "https://fonts.bunny.net/css?family=abril-fatface:400" },
      ],
      style: [
        { children: "body { font-family: 'Abril Fatface', 'LXGW WenKai TC', 'Microsoft JhengHei' }" }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})