import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import HomeAppBadge from './components/HomeAppBadge.vue'
import HomeHighlights from './components/HomeHighlights.vue'
import HomeScreenshots from './components/HomeScreenshots.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'home-hero-info-before': () => h(HomeAppBadge),
      'home-hero-info-after': () => h(HomeHighlights),
      'home-hero-image': () => h(HomeScreenshots),
    }),
} satisfies Theme
