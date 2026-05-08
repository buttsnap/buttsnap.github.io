import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ButtSnap',
  description: 'ButtSnap App Documentation & Community',

  // GitHub Pages needs base if not using custom domain
  base: '/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  // Clean URLs without .html extension
  cleanUrls: true,

  // Language redirect: map iOS locale IDs to locale keys
  // Falls back to English (en) for unsupported locales
  rewrites: {
    'en/:rest*': '/en/:rest*',
    'ja/:rest*': '/ja/:rest*',
    'ko/:rest*': '/ko/:rest*',
  },

  transformPageData(pageData, ctx) {
    const langParam = ctx.url.match(/[?&]lang=([^&]+)/)?.[1]
    if (langParam) {
      const langMap: Record<string, string> = {
        'zh-Hans': 'zh-CN',
        'zh-CN': 'zh-CN',
        'zh-TW': 'zh-CN',
        'zh-Hant': 'zh-CN',
        'ja': 'ja',
        'ko': 'ko',
        'en': 'en',
      }
      const targetLang = langMap[langParam] ?? 'en'
      ctx.headers.location = targetLang === 'zh-CN' ? '/' : `/${targetLang}/`
    }
  },

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
          pattern: 'https://github.com/buttsnap/buttsnap.github.io/edit/main/docs/:path',
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
          pattern: 'https://github.com/buttsnap/buttsnap.github.io/edit/main/docs/en/:path',
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

    ja: {
      label: '日本語',
      lang: 'ja-JP',
      dir: 'ltr',
      title: 'ButtSnap - アプリの使い方 & コミュニティ',
      description: 'ButtSnapアプリの使い方ガイド、よくある質問、利用規約、プライバシーポリシー',

      themeConfig: {
        nav: [
          { text: 'ホーム', link: '/ja/' },
          { text: '使い方', link: '/ja/guide/' },
          { text: 'よくある質問', link: '/ja/faq' },
          {
            text: '法的情報',
            items: [
              { text: '利用規約', link: '/ja/terms' },
              { text: 'プライバシーポリシー', link: '/ja/privacy' },
            ],
          },
          { text: 'フィードバック', link: '/ja/feedback' },
        ],

        sidebar: {
          '/ja/guide/': [
            {
              text: '使い方ガイド',
              items: [
                { text: '概要', link: '/ja/guide/' },
                { text: 'インストール', link: '/ja/guide/install' },
                { text: '基本操作', link: '/ja/guide/basic-usage' },
                { text: '便利な機能', link: '/ja/guide/advanced' },
              ],
            },
          ],
        },

        editLink: {
          pattern: 'https://github.com/buttsnap/buttsnap.github.io/edit/main/docs/ja/:path',
          text: 'GitHubで編集',
        },

        lastUpdated: {
          text: '最終更新',
        },

        outline: {
          label: '目次',
          level: [2, 3],
        },

        docFooter: {
          prev: '前のページ',
          next: '次のページ',
        },

        darkModeSwitchLabel: 'ダークモード',
        sidebarMenuLabel: 'メニュー',
        returnToTopLabel: 'トップに戻る',
        langMenuLabel: '言語',
      },
    },

    ko: {
      label: '한국어',
      lang: 'ko-KR',
      dir: 'ltr',
      title: 'ButtSnap - 앱 가이드 & 커뮤니티',
      description: 'ButtSnap 앱 사용 가이드, 자주 묻는 질문, 이용약관, 개인정보 처리방침',

      themeConfig: {
        nav: [
          { text: '홈', link: '/ko/' },
          { text: '가이드', link: '/ko/guide/' },
          { text: 'FAQ', link: '/ko/faq' },
          {
            text: '법적 정보',
            items: [
              { text: '이용약관', link: '/ko/terms' },
              { text: '개인정보 처리방침', link: '/ko/privacy' },
            ],
          },
          { text: '피드백', link: '/ko/feedback' },
        ],

        sidebar: {
          '/ko/guide/': [
            {
              text: '사용 가이드',
              items: [
                { text: '개요', link: '/ko/guide/' },
                { text: '설치하기', link: '/ko/guide/install' },
                { text: '기본 사용법', link: '/ko/guide/basic-usage' },
                { text: '고급 기능', link: '/ko/guide/advanced' },
              ],
            },
          ],
        },

        editLink: {
          pattern: 'https://github.com/buttsnap/buttsnap.github.io/edit/main/docs/ko/:path',
          text: 'GitHub에서 편집',
        },

        lastUpdated: {
          text: '마지막 업데이트',
        },

        outline: {
          label: '목차',
          level: [2, 3],
        },

        docFooter: {
          prev: '이전 페이지',
          next: '다음 페이지',
        },

        darkModeSwitchLabel: '다크 모드',
        sidebarMenuLabel: '메뉴',
        returnToTopLabel: '맨 위로',
        langMenuLabel: '언어',
      },
    },
  },

  // Shared theme config
  themeConfig: {
    logo: '/app-icon.png',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/buttsnap/buttsnap.github.io' },
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
          en: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search documentation',
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear search',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Navigate',
                  closeText: 'Close',
                },
              },
            },
          },
          ja: {
            translations: {
              button: {
                buttonText: '検索',
                buttonAriaLabel: 'ドキュメントを検索',
              },
              modal: {
                noResultsText: '結果が見つかりません',
                resetButtonTitle: '検索をクリア',
                footer: {
                  selectText: '選択',
                  navigateText: '移動',
                  closeText: '閉じる',
                },
              },
            },
          },
          ko: {
            translations: {
              button: {
                buttonText: '검색',
                buttonAriaLabel: '문서 검색',
              },
              modal: {
                noResultsText: '검색 결과 없음',
                resetButtonTitle: '검색 초기화',
                footer: {
                  selectText: '선택',
                  navigateText: '이동',
                  closeText: '닫기',
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
