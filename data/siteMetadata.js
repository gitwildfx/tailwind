/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'WildFx.io',
  author: 'Jason Deramo',
  headerTitle: ['</Learn_Code>', '</Write_Code>', '</Do_Code>'], // Rotating text
  description: 'How I became a Developer, and so can you.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://wildfx.io/',
  siteRepo: 'https://github.com/wildfxcode/tailwind',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: 'ask@wildfx.io',
  github: 'https://github.com/wildfxcode',
  youtube: 'https://youtube.com/@wild-fx',
  linkedin: 'https://www.linkedin.com/in/jasonderamo',
  bluesky: 'https://bsky.app',
  discord: 'https://discord.gg/PXgCYNyqwn',
  locale: 'en-US',
  stickyNav: false,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: 'buttondown',
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
};

module.exports = siteMetadata;
