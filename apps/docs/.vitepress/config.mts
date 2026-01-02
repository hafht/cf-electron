import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "CF Electron",
  description: "Internal Electron Framework Documentation",
  
  // Theme Configuration
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API Reference', link: '/api/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Architecture', link: '/guide/architecture' }
          ]
        },
        {
          text: 'Core Modules',
          items: [
            { text: 'App Bootstrap', link: '/guide/module-bootstrap' },
            { text: 'IPC', link: '/guide/module-ipc' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Exports', link: '/api/modules' },
            // Note: Users will navigate via the generated modules page
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-org/cf-electron' }
    ]
  },
  
  // Enable code snippets from other packages
  markdown: {
    // This allows importing code like: <<< ../../apps/demo-client/src/app.ts
  }
})

