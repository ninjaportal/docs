import { defineConfig } from 'vitepress'
import {sidebar} from "./sidebar.js";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NinjaPortal",
  description: "The Official NinjaPortal Documentation ",
  themeConfig: {
    logo: {
      dark: '/logo-dark.png',
        light: '/logo.png'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ninjaportal' }
    ],
    outline: {
      level: "deep"
    }
  },
  outDir: "dist"
})
