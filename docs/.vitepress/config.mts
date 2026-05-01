import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ButtSnap',
  description: 'ButtSnap App Documentation & Community',

  // GitHub Pages needs base if not using custom domain
  base: '/ButtSnap/',

  head: [
    ['link', { rel: 'icon', href: '/ButtSnap/favicon.ico' }],
  ],

  // Clean URLs without .html extension
  cleanUrls: true,

  // i18n configuration
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      dir: 'ltr',
      title: 'ButtSnap - 应用文档与社区',
      description: 'ButtSnap App 使用教程、常见问题、用户协议与隐私政策',

      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '使用教程', link: '/guide/' },
          { text: '常见问题', link: '/faq' },
          {
            text: '法律条款',
            items: [
              { text: '用户协议', link: '/terms' },
              { text: '隐私政策', link: '/privacy' },
            ],
          },
          { text: '反馈', link: '/feedback' },
        ],

        sidebar: {
          '/guide/': [
            {
              text: '使用教程',
              items: [
                { text: '概述', link: '/guide/' },
                { text: '安装与启动', link: '/guide/install' },
                { text: '基本使用', link: '/guide/basic-usage' },
                { text: '进阶功能', link: '/guide/advanced' },
              ],
            },
          ],
        },

        editLink: {
          pattern: 'https://github.com/cmsax/ButtSnap/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页',
        },

        lastUpdated: {
          text: '最后更新',
        },

        outline: {
          label: '页面导航',
          level: [2, 3],
        },

        docFooter: {
          prev: '上一页',
          next: '下一页',
        },

        darkModeSwitchLabel: '深色模式',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
        langMenuLabel: '切换语言',
      },
    },

    en: {
      label: 'English',
      lang: 'en-US',
      dir: 'ltr',
      title: 'ButtSnap - App Docs & Community',
      description: 'ButtSnap App user guide, FAQ, terms of service and privacy policy',

      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/' },
          { text: 'FAQ', link: '/en/faq' },
          {
            text: 'Legal',
            items: [
              { text: 'Terms of Service', link: '/en/terms' },
              { text: 'Privacy Policy', link: '/en/privacy' },
            ],
          },
          { text: 'Feedback', link: '/en/feedback' },
        ],

        sidebar: {
          '/en/guide/': [
            {
              text: 'User Guide',
              items: [
                { text: 'Overview', link: '/en/guide/' },
                { text: 'Installation', link: '/en/guide/install' },
                { text: 'Basic Usage', link: '/en/guide/basic-usage' },
                { text: 'Advanced Features', link: '/en/guide/advanced' },
              ],
            },
          ],
        },

        editLink: {
          pattern: 'https://github.com/cmsax/ButtSnap/edit/main/docs/en/:path',
          text: 'Edit this page on GitHub',
        },

        lastUpdated: {
          text: 'Last updated',
        },

        outline: {
          label: 'On this page',
          level: [2, 3],
        },

        docFooter: {
          prev: 'Previous page',
          next: 'Next page',
        },

        darkModeSwitchLabel: 'Dark mode',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Return to top',
        langMenuLabel: 'Change language',
      },
    },
  },

  // Shared theme config
  themeConfig: {
    logo: '/app-icon.png',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cmsax/ButtSnap' },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} ButtSnap`,
    },
  },
})
