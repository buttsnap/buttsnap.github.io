import { defineConfig } from 'vitepress'

const APP_STORE_ID = '6762453848'
const APP_BUNDLE_ID = 'com.unoiou.cms.ButtSnap'
const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`

const screenshotLocaleForPath = (relativePath: string) => {
  if (relativePath.startsWith('zh-Hant/')) return 'zh-hant'

  const locale = relativePath.split('/')[0]
  if (['en', 'ja', 'ko', 'fr', 'de', 'zh'].includes(locale)) return locale

  return 'en'
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ButtSnap',
  description: 'ButtSnap App Documentation & Community',

  // GitHub Pages needs base if not using custom domain
  base: '/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'apple-itunes-app', content: `app-id=${APP_STORE_ID}` }],
    ['meta', { name: 'buttsnap:bundle-id', content: APP_BUNDLE_ID }],
    ['meta', { name: 'buttsnap:app-store-url', content: APP_STORE_URL }],
  ],

  // Clean URLs without .html extension
  cleanUrls: true,

  // Language redirect: map iOS locale IDs to locale keys
  // Falls back to English at the root path for unsupported locales
  rewrites: {
    'en/:rest*': '/en/:rest*',
    'zh/:rest*': '/zh/:rest*',
    'zh-Hant/:rest*': '/zh-Hant/:rest*',
    'ja/:rest*': '/ja/:rest*',
    'ko/:rest*': '/ko/:rest*',
    'fr/:rest*': '/fr/:rest*',
    'de/:rest*': '/de/:rest*',
  },

  transformPageData(pageData, ctx) {
    const langParam = ctx.url?.match(/[?&]lang=([^&]+)/)?.[1]
    if (langParam) {
      const langMap: Record<string, string> = {
        'zh-Hans': 'zh',
        'zh-CN': 'zh',
        'zh-TW': 'zh-Hant',
        'zh-HK': 'zh-Hant',
        'zh-MO': 'zh-Hant',
        'zh-Hant': 'zh-Hant',
        'ja': 'ja',
        'ja-JP': 'ja',
        'ko': 'ko',
        'ko-KR': 'ko',
        'en': 'en',
        'en-US': 'en',
        'en-GB': 'en',
        'fr': 'fr',
        'fr-FR': 'fr',
        'de': 'de',
        'de-DE': 'de',
      }
      const targetLang = langMap[langParam] ?? 'en'
      ctx.headers.location = targetLang === 'en' ? '/' : `/${targetLang}/`
    }
  },

  transformHead({ pageData }) {
    if (pageData.frontmatter.layout !== 'home' || !pageData.relativePath.endsWith('index.md')) {
      return []
    }

    const locale = screenshotLocaleForPath(pageData.relativePath)
    return Array.from({ length: 4 }, (_, index) => {
      const id = String(index + 1).padStart(2, '0')
      return [
        'link',
        {
          rel: 'preload',
          as: 'image',
          href: `/screenshots/home/${locale}/shot-${id}.webp`,
          type: 'image/webp',
          ...(index === 0 ? { fetchpriority: 'high' } : {}),
        },
      ] as const
    })
  },

  // i18n configuration
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      dir: 'ltr',
      title: 'ButtSnap - App Docs & Community',
      description: 'ButtSnap App user guide, FAQ, terms of service and privacy policy',

      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },
          { text: 'FAQ', link: '/faq' },
          {
            text: 'Legal',
            items: [
              { text: 'Terms of Service', link: '/terms' },
              { text: 'Privacy Policy', link: '/privacy' },
            ],
          },
          { text: 'Feedback', link: '/feedback' },
        ],

        sidebar: {
          '/guide/': [
            {
              text: 'User Guide',
              items: [
                { text: 'Overview', link: '/guide/' },
                { text: 'Installation', link: '/guide/install' },
                { text: 'Basic Usage', link: '/guide/basic-usage' },
                { text: 'Advanced Features', link: '/guide/advanced' },
              ],
            },
          ],
        },

        editLink: {
          pattern: 'https://github.com/buttsnap/buttsnap.github.io/edit/main/docs/:path',
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

    'zh-Hant': {
      label: '繁體中文',
      lang: 'zh-Hant',
      dir: 'ltr',
      title: 'ButtSnap - App 文件與社群',
      description: 'ButtSnap App 使用教學、常見問題、使用條款與隱私權政策',

      themeConfig: {
        nav: [
          { text: '首頁', link: '/zh-Hant/' },
          { text: '使用教學', link: '/zh-Hant/guide/' },
          { text: '常見問題', link: '/zh-Hant/faq' },
          {
            text: '法律條款',
            items: [
              { text: '使用條款', link: '/zh-Hant/terms' },
              { text: '隱私權政策', link: '/zh-Hant/privacy' },
            ],
          },
          { text: '回饋', link: '/zh-Hant/feedback' },
        ],

        sidebar: {
          '/zh-Hant/guide/': [
            {
              text: '使用教學',
              items: [
                { text: '概覽', link: '/zh-Hant/guide/' },
                { text: '安裝與啟動', link: '/zh-Hant/guide/install' },
                { text: '基本使用', link: '/zh-Hant/guide/basic-usage' },
                { text: '進階功能', link: '/zh-Hant/guide/advanced' },
              ],
            },
          ],
        },

        editLink: {
          pattern: 'https://github.com/buttsnap/buttsnap.github.io/edit/main/docs/zh-Hant/:path',
          text: '在 GitHub 上編輯此頁',
        },

        lastUpdated: {
          text: '最後更新',
        },

        outline: {
          label: '頁面導覽',
          level: [2, 3],
        },

        docFooter: {
          prev: '上一頁',
          next: '下一頁',
        },

        darkModeSwitchLabel: '深色模式',
        sidebarMenuLabel: '選單',
        returnToTopLabel: '回到頂端',
        langMenuLabel: '切換語言',
      },
    },

    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      dir: 'ltr',
      title: 'ButtSnap - 应用文档与社区',
      description: 'ButtSnap App 使用教程、常见问题、用户协议与隐私政策',

      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '使用教程', link: '/zh/guide/' },
          { text: '常见问题', link: '/zh/faq' },
          {
            text: '法律条款',
            items: [
              { text: '用户协议', link: '/zh/terms' },
              { text: '隐私政策', link: '/zh/privacy' },
            ],
          },
          { text: '反馈', link: '/zh/feedback' },
        ],

        sidebar: {
          '/zh/guide/': [
            {
              text: '使用教程',
              items: [
                { text: '概述', link: '/zh/guide/' },
                { text: '安装与启动', link: '/zh/guide/install' },
                { text: '基本使用', link: '/zh/guide/basic-usage' },
                { text: '进阶功能', link: '/zh/guide/advanced' },
              ],
            },
          ],
        },

        editLink: {
          pattern: 'https://github.com/buttsnap/buttsnap.github.io/edit/main/docs/zh/:path',
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

    fr: {
      label: 'Français',
      lang: 'fr-FR',
      dir: 'ltr',
      title: 'ButtSnap - Documentation et communaute',
      description: 'Guide ButtSnap, FAQ, conditions d’utilisation et politique de confidentialite',

      themeConfig: {
        nav: [
          { text: 'Accueil', link: '/fr/' },
          { text: 'Guide', link: '/fr/guide/' },
          { text: 'FAQ', link: '/fr/faq' },
          {
            text: 'Legal',
            items: [
              { text: 'Conditions d’utilisation', link: '/fr/terms' },
              { text: 'Confidentialite', link: '/fr/privacy' },
            ],
          },
          { text: 'Feedback', link: '/fr/feedback' },
        ],

        sidebar: {
          '/fr/guide/': [
            {
              text: 'Guide utilisateur',
              items: [
                { text: 'Vue d’ensemble', link: '/fr/guide/' },
                { text: 'Installation', link: '/fr/guide/install' },
                { text: 'Utilisation de base', link: '/fr/guide/basic-usage' },
                { text: 'Fonctions avancees', link: '/fr/guide/advanced' },
              ],
            },
          ],
        },

        editLink: {
          pattern: 'https://github.com/buttsnap/buttsnap.github.io/edit/main/docs/fr/:path',
          text: 'Modifier cette page sur GitHub',
        },

        lastUpdated: {
          text: 'Derniere mise a jour',
        },

        outline: {
          label: 'Sur cette page',
          level: [2, 3],
        },

        docFooter: {
          prev: 'Page precedente',
          next: 'Page suivante',
        },

        darkModeSwitchLabel: 'Mode sombre',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Retour en haut',
        langMenuLabel: 'Changer de langue',
      },
    },

    de: {
      label: 'Deutsch',
      lang: 'de-DE',
      dir: 'ltr',
      title: 'ButtSnap - App-Dokumentation und Community',
      description: 'ButtSnap App-Anleitung, FAQ, Nutzungsbedingungen und Datenschutzrichtlinie',

      themeConfig: {
        nav: [
          { text: 'Start', link: '/de/' },
          { text: 'Anleitung', link: '/de/guide/' },
          { text: 'FAQ', link: '/de/faq' },
          {
            text: 'Rechtliches',
            items: [
              { text: 'Nutzungsbedingungen', link: '/de/terms' },
              { text: 'Datenschutz', link: '/de/privacy' },
            ],
          },
          { text: 'Feedback', link: '/de/feedback' },
        ],

        sidebar: {
          '/de/guide/': [
            {
              text: 'Benutzeranleitung',
              items: [
                { text: 'Ubersicht', link: '/de/guide/' },
                { text: 'Installation', link: '/de/guide/install' },
                { text: 'Grundlagen', link: '/de/guide/basic-usage' },
                { text: 'Erweiterte Funktionen', link: '/de/guide/advanced' },
              ],
            },
          ],
        },

        editLink: {
          pattern: 'https://github.com/buttsnap/buttsnap.github.io/edit/main/docs/de/:path',
          text: 'Diese Seite auf GitHub bearbeiten',
        },

        lastUpdated: {
          text: 'Zuletzt aktualisiert',
        },

        outline: {
          label: 'Auf dieser Seite',
          level: [2, 3],
        },

        docFooter: {
          prev: 'Vorherige Seite',
          next: 'Nachste Seite',
        },

        darkModeSwitchLabel: 'Dunkler Modus',
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Nach oben',
        langMenuLabel: 'Sprache wechseln',
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
          zh: {
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
          'zh-Hant': {
            translations: {
              button: {
                buttonText: '搜尋文件',
                buttonAriaLabel: '搜尋文件',
              },
              modal: {
                noResultsText: '找不到相關結果',
                resetButtonTitle: '清除搜尋條件',
                footer: {
                  selectText: '選擇',
                  navigateText: '切換',
                  closeText: '關閉',
                },
              },
            },
          },
          fr: {
            translations: {
              button: {
                buttonText: 'Rechercher',
                buttonAriaLabel: 'Rechercher dans la documentation',
              },
              modal: {
                noResultsText: 'Aucun resultat',
                resetButtonTitle: 'Effacer la recherche',
                footer: {
                  selectText: 'Selectionner',
                  navigateText: 'Naviguer',
                  closeText: 'Fermer',
                },
              },
            },
          },
          de: {
            translations: {
              button: {
                buttonText: 'Suchen',
                buttonAriaLabel: 'Dokumentation durchsuchen',
              },
              modal: {
                noResultsText: 'Keine Ergebnisse gefunden',
                resetButtonTitle: 'Suche zurucksetzen',
                footer: {
                  selectText: 'Auswahlen',
                  navigateText: 'Navigieren',
                  closeText: 'Schliessen',
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
