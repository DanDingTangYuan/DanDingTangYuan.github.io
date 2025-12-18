import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
    // 1. 同時抓取三個主要的 Collection
    // Wiki 通常不需要 RSS 推播，所以這裡我們只抓 "有時效性" 的內容
    const blog = await getCollection('blog');
    const devlog = await getCollection('devlog');
    const story = await getCollection('story');

    // 2. 合併資料並處理連結
    // 我們需要把每個 Collection 的資料 map 一下，加上正確的連結前綴
    const allPosts = [
        ...blog.map((post) => ({ ...post, link: `/blog/${post.id}/` })),
        ...devlog.map((post) => ({ ...post, link: `/devlog/${post.id}/` })),
        ...story.map((post) => ({ ...post, link: `/story/${post.id}/` })),
    ];

    // 3. 按照日期排序 (最新的在最上面)
    // 這樣讀者收到的通知才會是最新的
    allPosts.sort((a, b) => 
        new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf()
    );

    // 4. 生成 RSS XML
    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site,
        // 這裡只需要回傳整理好的 items
        items: allPosts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
            link: post.link, // 這是我們剛剛處理過的正確連結
            // 如果有自訂欄位 (如 contentRating)，也可以考慮加進 customData，但通常這樣就夠了
        })),
    });
}