module.exports = {
  base: '/blog/',
  title: "taujiong's blog",
  description: 'Do one thing and do it well',
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
      { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
      {
        text: 'GitHub',
        link: 'https://github.com/taujiong',
        icon: 'reco-github',
      },
    ],
    author: 'taujiong',
    startYear: '2017',
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
    [
      'autometa',
      {
        author: {
          name: 'taujiong',
        },
        canonical_base: 'https://j3space.xyz',
      },
    ],
    [
      'sitemap',
      {
        hostname: 'https://j3space.xyz',
      },
    ],
  ],
};
