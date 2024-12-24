import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'VS POP Extension Docs',
  description: 'Documentation for VS POP Extension',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/what-is-vs-pop' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is VS POP?', link: '/what-is-vs-pop' },
          { text: 'Getting Started', link: '/getting-started' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bencodezen/vs-pop-extension' }
    ]
  }
})
