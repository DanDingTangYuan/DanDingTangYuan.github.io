/**
 * 國際化工具函數 (i18n/utils.ts)
 * 
 * 用途：
 * - 提供翻譯取得函數
 * - 處理缺失翻譯的 fallback
 * - 提供語言相關的工具函數
 */

import { DEFAULT_LANGUAGE, type Language, isValidLanguage } from './config';
import zhTranslations from './translations/zh.json';
import jaTranslations from './translations/ja.json';

/* ============================================================================
   翻譯資料
   ============================================================================ */

/**
 * 所有語言的翻譯資料
 * 
 * 說明：
 * - 每個語言對應一個翻譯物件
 * - 翻譯物件包含所有需要翻譯的字串
 */
const translations: Record<Language, typeof zhTranslations> = {
  zh: zhTranslations,
  ja: jaTranslations,
};

/* ============================================================================
   翻譯取得函數
   ============================================================================ */

/**
 * 根據語言和鍵取得翻譯字串
 * 
 * @param lang - 語言代碼
 * @param key - 翻譯鍵（支援點符號，例如 'nav.home'）
 * @param fallback - 如果翻譯不存在時的備用字串
 * @returns 翻譯字串，如果不存在則返回 fallback 或鍵本身
 * 
 * 例如：
 * - t('zh', 'nav.home') -> '首頁'
 * - t('ja', 'nav.blog') -> 'ブログ'
 * - t('zh', 'nonexistent.key', 'Default') -> 'Default'
 */
export function t(
  lang: string,
  key: string,
  fallback?: string
): string {
  // 驗證語言代碼
  const validLang = isValidLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  
  // 取得該語言的翻譯物件
  const langTranslations = translations[validLang];
  
  // 支援點符號鍵（例如 'nav.home'）
  const keys = key.split('.');
  let value: any = langTranslations;
  
  // 逐層取得翻譯值
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // 如果找不到翻譯，返回 fallback 或鍵本身
      return fallback || key;
    }
  }
  
  // 確保返回字串
  return typeof value === 'string' ? value : (fallback || key);
}

/**
 * 取得所有語言的翻譯物件
 * 
 * @param lang - 語言代碼
 * @returns 該語言的完整翻譯物件
 * 
 * 例如：
 * - getTranslations('zh') -> { nav: { home: '首頁', ... }, ... }
 */
export function getTranslations(lang: string) {
  const validLang = isValidLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  return translations[validLang];
}

/* ============================================================================
   語言路由工具函數
   ============================================================================ */

/**
 * 從 URL 路徑中提取語言代碼
 * 
 * @param pathname - URL 路徑（例如 '/blog/zh/post-1'）
 * @returns 語言代碼（例如 'zh'）或預設語言
 * 
 * 例如：
 * - extractLanguageFromPath('/blog/zh/post-1') -> 'zh'
 * - extractLanguageFromPath('/blog/post-1') -> 'zh' (預設語言)
 */
export function extractLanguageFromPath(pathname: string): Language {
  // 分割路徑
  const segments = pathname.split('/').filter(Boolean);
  
  // 尋找語言代碼（通常在第二個位置，例如 /blog/zh/post-1）
  if (segments.length >= 2) {
    const potentialLang = segments[1];
    if (isValidLanguage(potentialLang)) {
      return potentialLang;
    }
  }
  
  // 如果找不到有效的語言代碼，返回預設語言
  return DEFAULT_LANGUAGE;
}

/**
 * 生成帶語言代碼的 URL 路徑
 * 
 * @param collection - 集合名稱（例如 'blog', 'devlog'）
 * @param lang - 語言代碼
 * @param slug - 文章 ID
 * @returns 完整的 URL 路徑
 * 
 * 例如：
 * - generatePath('blog', 'zh', 'my-post') -> '/blog/zh/my-post'
 * - generatePath('devlog', 'ja', 'update-log') -> '/devlog/ja/update-log'
 */
export function generatePath(
  collection: string,
  lang: string,
  slug: string
): string {
  const validLang = isValidLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  return `/${collection}/${validLang}/${slug}`;
}
