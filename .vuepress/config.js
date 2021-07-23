module.exports = {
  base: '/blog',
  title: "taujiong's blog",
  description: 'search, solve, record, review',
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  theme: 'reco',
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
    ['link', { rel: 'icon', href: '/logo.png' }],
  ],
  themeConfig: {
    type: 'blog',
    subSidebar: 'auto',
    logo: '/logo.jpg',
    authorAvatar: '/logo.jpg',
    nav: [
      { text: '归档', link: '/timeline/', icon: 'reco-date' },
      {
        text: 'GitHub',
        link: 'https://github.com/taujiong',
        icon: 'reco-github',
      },
    ],
    author: 'taujiong',
    startYear: '2017',
    record: '苏ICP备19016368号-4',
    recordLink: 'https://beian.miit.gov.cn',
  },
  plugins: [
    [
      'vuepress-plugin-nuggets-style-copy',
      {
        copyText: '代码复制',
        tip: {
          content: '复制成功!',
        },
      },
    ],
  ],
};
