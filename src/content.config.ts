/**
 * Astro 內容集合配置文件
 * 
 * 此文件定義了所有內容集合的結構和驗證規則
 * 使用 Zod 進行 frontmatter 類型檢查
 * 
 * 內容集合：
 * - devlog: 開發日誌
 * - blog: 部落格文章
 * - story: 小說/故事連載
 * - wiki: 設定集/百科
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * DevLog 集合 - 開發日誌
 * 用於記錄項目開發進度和技術筆記
 * 
 * 多語言支援：
 * - 內容按語言分類在子資料夾中
 * - 例如：src/content/devlog/zh/post.md、src/content/devlog/ja/post.md
 */
const devlog = defineCollection({
	loader: glob({ base: './src/content/devlog', pattern: '**/*.{md,mdx,mdoc}' }),
	schema: z.object({
		languages: z.array(z.enum(['zh', 'ja'])).default(['zh']), // 支援的語言
		title: z.string(), // 文章標題
		description: z.string(), // 簡介/摘要
		pubDate: z.coerce.date(), // 發布日期
		updatedDate: z.coerce.date().optional(), // 更新日期
		version: z.string().optional(), // 版本號
		repoURL: z.string().url().optional(), // 專案 GitHub 連結
		tags: z.array(z.string()).default([]).optional(), // 技術標籤
		projectStatus: z.enum(['development', 'maintenance', 'fixing', 'completed', 'abandoned']).optional(), // 專案狀態
		thumbnail: z.string().url().optional(), // 縮圖 URL
		pinned: z.boolean().optional().default(false), // 是否置頂
	}),
});

/**
 * Blog 集合 - 部落格文章
 * 用於發布一般性的文章和想法
 * 
 * 多語言支援：
 * - 內容按語言分類在子資料夾中
 * - 例如：src/content/blog/zh/post.md、src/content/blog/ja/post.md
 */
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx,mdoc}' }),
	schema: z.object({
		languages: z.array(z.enum(['zh', 'ja'])).default(['zh']), // 支援的語言
		title: z.string(), // 文章標題
		description: z.string(), // 簡介/摘要
		pubDate: z.coerce.date(), // 發布日期
		updatedDate: z.coerce.date().optional(), // 更新日期
		tags: z.array(z.string()).default([]).optional(), // 文章標籤
		thumbnail: z.string().url().optional(), // 縮圖 URL
		draft: z.boolean().optional(), // 是否為草稿
		pinned: z.boolean().optional().default(false), // 是否置頂
	}),
});

/**
 * Story 集合 - 小說/故事連載
 * 用於發布創意寫作和故事連載
 * 
 * 多語言支援：
 * - 內容按語言分類在子資料夾中
 * - 例如：src/content/story/zh/post.md、src/content/story/ja/post.md
 */
const story = defineCollection({
	loader: glob({ base: './src/content/story', pattern: '**/*.{md,mdx,mdoc}' }),
	schema: z.object({
		languages: z.array(z.enum(['zh', 'ja'])).default(['zh']), // 支援的語言
		title: z.string(), // 章節標題
		series: z.string(), // 系列名稱
		chapter: z.number(), // 章節編號
		pubDate: z.coerce.date(), // 發布日期
		updatedDate: z.coerce.date().optional(), // 更新日期
		status: z.enum(['ongoing', 'completed', 'hiatus']).default('ongoing'), // 連載狀態
		tags: z.array(z.string()).default([]).optional(), // 標籤
		coverImage: z.string().url().optional(), // 封面圖片 URL
		pinned: z.boolean().optional().default(false), // 是否置頂
	}),
});

/**
 * Wiki 集合 - 設定集/百科
 * 用於存儲世界觀設定、角色資料等
 * 
 * 多語言支援：
 * - 內容按語言分類在子資料夾中
 * - 例如：src/content/wiki/zh/post.md、src/content/wiki/ja/post.md
 */
const wiki = defineCollection({
	loader: glob({ base: './src/content/wiki', pattern: '**/*.{md,mdx,mdoc}' }),
	schema: z.object({
		languages: z.array(z.enum(['zh', 'ja'])).default(['zh']), // 支援的語言
		title: z.string(), // 條目名稱
		category: z.enum(['Character', 'Location', 'Item', 'Lore']), // 分類
		updatedDate: z.coerce.date(), // 最後修訂時間
		tags: z.array(z.string()).optional(), // 標籤
		thumbnail: z.string().url().optional(), // 縮圖 URL
		content: z.string(), // 內文
	}),
});

/** 導出所有集合供 Astro 使用 */
export const collections = { devlog, blog, story, wiki };
