// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage:  import.meta.env.PROD
  ?{
    kind: 'server',
    repo: 'dandingtangyuan/dandingtangyuan.github.io', // 替換成您的 GitHub 倉庫
  }
  :{
    kind: 'local', // 開發時用 local，上線後我們會教您改成 'github'
  },
  collections: {
    posts: collection({
      label: '小說連載',
      slugField: 'slug',
      path: 'src/content/blog/*', // 對應官方模板的路徑
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '標題' } }),
        pubDate: fields.date({ label: '發布日期' }),
        description: fields.text({ label: '簡介' }),
        content: fields.document({
          label: '內文',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});