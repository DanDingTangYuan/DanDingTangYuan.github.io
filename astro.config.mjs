// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
// 引入 Keystatic
import keystatic from '@keystatic/astro';
// 引入 React
import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://dandingtangyuan.github.io',

  // 保持靜態
  output: 'static',

  integrations: [mdx(), sitemap(), keystatic(), react()],
  adapter: vercel(),
});