/**
 * 國際化配置 (i18n/config.ts)
 * 
 * 用途：
 * - 定義支援的語言列表
 * - 設定預設語言
 * - 提供語言名稱映射
 * - 提供語言代碼驗證函數
 */

/* ============================================================================
   語言列表定義
   ============================================================================ */

/**
 * 支援的語言代碼列表
 * 
 * 說明：
 * - 'zh' 繁體中文
 * - 'ja' 日本語
 */
export const SUPPORTED_LANGUAGES = ['zh', 'ja'] as const;

/**
 * 語言類型定義
 * 用於 TypeScript 類型檢查
 */
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

/**
 * 預設語言
 * 當使用者未指定語言時使用此語言
 */
export const DEFAULT_LANGUAGE: Language = 'zh';

/* ============================================================================
   語言名稱映射
   ============================================================================ */

/**
 * 語言代碼到語言名稱的映射
 * 用於在 UI 中顯示語言名稱
 * 
 * 例如：
 * - 'zh' -> '繁體中文'
 * - 'ja' -> '日本語'
 */
export const LANGUAGE_NAMES: Record<Language, string> = {
  zh: '繁體中文',
  ja: '日本語',
};

/* ============================================================================
   語言驗證函數
   ============================================================================ */

/**
 * 驗證語言代碼是否有效
 * 
 * @param lang - 要驗證的語言代碼
 * @returns 如果語言代碼有效則返回 true，否則返回 false
 * 
 * 例如：
 * - isValidLanguage('zh') -> true
 * - isValidLanguage('en') -> false
 */
export function isValidLanguage(lang: string): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language);
}

/**
 * 取得有效的語言代碼
 * 如果提供的語言代碼無效，則返回預設語言
 * 
 * @param lang - 要驗證的語言代碼
 * @returns 有效的語言代碼
 * 
 * 例如：
 * - getValidLanguage('zh') -> 'zh'
 * - getValidLanguage('en') -> 'zh' (預設語言)
 */
export function getValidLanguage(lang: string): Language {
  return isValidLanguage(lang) ? lang : DEFAULT_LANGUAGE;
}
