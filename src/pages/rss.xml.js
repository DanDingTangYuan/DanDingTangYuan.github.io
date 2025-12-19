/**
 * RSS Feed 生成器 (rss.xml.js)
 * 
 * 用途：
 * - 生成 RSS XML 訂閱源
 * - 聚合所有內容集合的文章
 * - 提供給 RSS 閱讀器訂閱
 * 
 * 路由：/rss.xml
 * 
 * 包含的內容：
 * - Blog 文章
 * - DevLog 開發日誌
 * - Story 故事連載
 * - 不包含 Wiki（因為 Wiki 不是時效性內容）
 */

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

/**
 * GET 請求處理函數
 * Astro 會自動調用此函數生成 RSS XML
 */
export async function GET(context) {
    // ========================================================================
    // 第一步：獲取所有內容集合
    // ========================================================================
    // 只獲取有時效性的內容（Blog、DevLog、Story）
    // Wiki 是靜態設定集，不需要在 RSS 中推播
    const blog = await getCollection('blog');
    const devlog = await getCollection('devlog');
    const story = await getCollection('story');

    // ========================================================================
    // 第二步：合併資料並添加正確的連結
    // ========================================================================
    // 為每個文章添加對應的 URL 前綴
    const allPosts = [
        ...blog.map((post) => ({ ...post, link: `/blog/${post.id}/` })),
        ...devlog.map((post) => ({ ...post, link: `/devlog/${post.id}/` })),
        ...story.map((post) => ({ ...post, link: `/story/${post.id}/` })),
    ];

    // ========================================================================
    // 第三步：按發布日期排序
    // ========================================================================
    // 最新的文章在最前面，這樣訂閱者會先看到最新內容
    allPosts.sort((a, b) => 
        new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
    );

    // ========================================================================
    // 第四步：生成 RSS XML
    // ========================================================================
    return rss({
        title: SITE_TITLE, // RSS 源標題
        description: SITE_DESCRIPTION, // RSS 源描述
        site: context.site, // 網站 URL
        // 轉換文章為 RSS item 格式
        items: allPosts.map((post) => ({
            title: post.data.title, // 文章標題
            description: post.data.description, // 文章描述
            pubDate: post.data.pubDate, // 發布日期
            link: post.link, // 文章連結
        })),
    });
}