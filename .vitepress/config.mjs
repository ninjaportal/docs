import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar.js'

const base = process.env.NINJAPORTAL_DOCS_BASE
  ?? (process.env.GITHUB_ACTIONS === 'true' ? '/docs/' : '/')

export default defineConfig({
  title: 'NinjaPortal',
  description: 'Developer and integrator documentation for the NinjaPortal platform',
  base,
  srcDir: 'src',
  ignoreDeadLinks: true,
  themeConfig: {
    logo: {
      dark: '/logo-dark.png',
      light: '/logo.png'
    },
    nav: [
      {
        text: 'Docs',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Introduction', link: '/introduction/' },
          { text: 'Deepdive', link: '/deepdive/' },
          { text: 'References', link: '/references/' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Package Matrix', link: '/reference/package-matrix' },
          { text: 'Schema', link: '/reference/database-schema' },
          { text: 'Events', link: '/reference/events' },
          { text: 'Listeners & Observers', link: '/reference/listeners-observers' },
          { text: 'API Docs (Scribe)', link: '/portal-api/scribe' }
        ]
      },
      { text: 'Cookbook', link: '/cookbook/' }
    ],
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ninjaportal' }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      level: 'deep'
    }
  }
})
