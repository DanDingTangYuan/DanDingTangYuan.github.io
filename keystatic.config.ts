// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
    storage:
    {
        kind: 'github',
        repo: {
            owner: 'DanDingTangYuan',
            name: 'DanDingTangYuan.github.io',
        } 
    },
    collections: {
        devlog: collection({
            label: 'Devlog 開發日誌',
            slugField: 'title',
            path: 'src/content/devlog/[language]/*', 
            format: { contentField: 'content' },    // 啟用 Markdown 編輯器
            schema: {
                languages: fields.array(
                    fields.select({
                        label: '語言',
                        options: [
                            { label: '中文 (Chinese)', value: 'zh' },
                            { label: '日本語 (Japanese)', value: 'ja' },
                        ],
                        defaultValue: 'zh',
                    }),
                    {
                        label: '語言 (Languages)',
                        itemLabel: (props) => {
                            const labels: Record<string, string> = {
                                'zh': '中文 (Chinese)',
                                'ja': '日本語 (Japanese)',
                            };
                            return labels[props.value] || props.value;
                        },
                    }
                ),
                title: fields.slug({ name: { label: '標題' } }),
                description: fields.text({ label: '簡介/摘要', multiline: true}),
                pubDate: fields.date({ label: '發布日期', defaultValue: {kind: 'today'}}),
                updatedDate: fields.date({ label: '更新日期', defaultValue: {kind: 'today'}}),
                version: fields.text({ label: '版本號'}),
                repoURL: fields.text({ label: 'Repo 連結 (URL)' }),
                tags: fields.array(fields.text({ label: '標籤'}), {label: '技術標籤 (Tags)',itemLabel: (props) => props.value,}),
                projectStatus: fields.select({
                label: '專案狀態 (Status)',
                options: [
                    { label: '開發中 (Development)', value: 'development' },
                    { label: '維護中 (Maintenance)', value: 'maintenance' },
                    { label: '修理中 (Fixing)', value: 'fixing' },
                    { label: '已完成 (Completed)', value: 'completed' },
                    { label: '已棄坑 (Abandoned)', value: 'abandoned' },
                ],
                defaultValue: 'development',
                }),
                thumbnail: fields.text({ label: '縮圖網址 (Thumbnail URL)' }),
                pinned: fields.checkbox({ label: '置頂文章', description: '勾選後將在首頁置頂顯示', defaultValue: false }),
                content: fields.markdoc({ label: '內文' }),
            },
        }),

        blog: collection({
            label: 'Blog 部落格文章',
            slugField: 'title',
            path: 'src/content/blog/[language]/*', 
            format: { contentField: 'content' },
            schema: {
                languages: fields.array(
                    fields.select({
                        label: '語言',
                        options: [
                            { label: '中文 (Chinese)', value: 'zh' },
                            { label: '日本語 (Japanese)', value: 'ja' },
                        ],
                        defaultValue: 'zh',
                    }),
                    {
                        label: '語言 (Languages)',
                        itemLabel: (props) => {
                            const labels: Record<string, string> = {
                                'zh': '中文 (Chinese)',
                                'ja': '日本語 (Japanese)',
                            };
                            return labels[props.value] || props.value;
                        },
                    }
                ),
                title: fields.slug({ name: { label: '標題' } }),
                description: fields.text({ label: '簡介/摘要', multiline: true}),
                pubDate: fields.date({ label: '發布日期', defaultValue: {kind: 'today'}}),
                updatedDate: fields.date({ label: '更新日期', defaultValue: {kind: 'today'}}),
                tags: fields.array(fields.text({ label: '標籤'}), {label: '文章標籤 (Tags)',itemLabel: (props) => props.value,}),
                thumbnail: fields.text({ label: '縮圖網址 (Thumbnail URL)' }),
                draft: fields.checkbox({ label: '草稿狀態', description: '勾選後將不會發布', defaultValue: false }),
                pinned: fields.checkbox({ label: '置頂文章', description: '勾選後將在首頁置頂顯示', defaultValue: false }),
                content: fields.markdoc({ label: '內文' }),
            },
        }),

        story: collection({
            label: 'Story 小說/故事連載',
            slugField: 'title',
            path: 'src/content/story/[language]/*', 
            format: { contentField: 'content' },
            schema: {
                languages: fields.array(
                    fields.select({
                        label: '語言',
                        options: [
                            { label: '中文 (Chinese)', value: 'zh' },
                            { label: '日本語 (Japanese)', value: 'ja' },
                        ],
                        defaultValue: 'zh',
                    }),
                    {
                        label: '語言 (Languages)',
                        itemLabel: (props) => {
                            const labels: Record<string, string> = {
                                'zh': '中文 (Chinese)',
                                'ja': '日本語 (Japanese)',
                            };
                            return labels[props.value] || props.value;
                        },
                    }
                ),
                title: fields.slug({ name: { label: '章節標題 (Title)' } }),
                series: fields.text({ label: '系列名稱 (Series)', description: '作品名稱' }),
                chapter: fields.integer({ label: '章節編號 (Chapter No.)', defaultValue: 1 }),
                pubDate: fields.date({ label: '發布日期', defaultValue: { kind: 'today' } }),
                updatedDate: fields.date({ label: '更新日期' }),
                status: fields.select({
                label: '連載狀態',
                options: [
                    { label: '連載中 (Ongoing)', value: 'ongoing' },
                    { label: '已完結 (Completed)', value: 'completed' },
                    { label: '休刊 (Hiatus)', value: 'hiatus' },
                ],
                defaultValue: 'ongoing',
                }),

                tags: fields.array(fields.text({ label: 'Tag' }), { label: '標籤' }),
                coverImage: fields.text({ label: '封面網址 (Cover URL)' }),
                pinned: fields.checkbox({ label: '置頂文章', description: '勾選後將在首頁置頂顯示', defaultValue: false }),
                content: fields.markdoc({ label: '內文' }),
            },
        }),

        wiki: collection({
            label: '📚 Wiki | 設定集',
            slugField: 'title',
            path: 'src/content/wiki/[language]/*',
            format: { contentField: 'content' },
            schema: {
                languages: fields.array(
                    fields.select({
                        label: '語言',
                        options: [
                            { label: '中文 (Chinese)', value: 'zh' },
                            { label: '日本語 (Japanese)', value: 'ja' },
                        ],
                        defaultValue: 'zh',
                    }),
                    {
                        label: '語言 (Languages)',
                        itemLabel: (props) => {
                            const labels: Record<string, string> = {
                                'zh': '中文 (Chinese)',
                                'ja': '日本語 (Japanese)',
                            };
                            return labels[props.value] || props.value;
                        },
                    }
                ),
                title: fields.slug({ name: { label: '條目名稱 (Title)' } }),
                
                category: fields.select({
                label: '分類 (Category)',
                options: [
                    { label: '角色 (Character)', value: 'Character' },
                    { label: '地點 (Location)', value: 'Location' },
                    { label: '道具 (Item)', value: 'Item' },
                    { label: '傳說 (Lore)', value: 'Lore' },
                ],
                defaultValue: 'Character',
                }),

                updatedDate: fields.date({ label: '最後修訂時間', defaultValue: { kind: 'today' } }),
                tags: fields.array(fields.text({ label: 'Tag' }), { label: '標籤' }),
                thumbnail: fields.text({ label: '縮圖網址' }),
                content: fields.markdoc({ label: '內文' }),
            },
        }),
    },
});