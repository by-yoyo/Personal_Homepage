export const locales = ['en', 'zh'] as const;
export const defaultLocale = 'en' as const;
export type Locale = (typeof locales)[number];

import type enDictionary from './en.json';
import type zhDictionary from './zh.json';

type AllKeys = keyof typeof enDictionary | keyof typeof zhDictionary;

type DictionaryValue<K extends AllKeys> = K extends keyof typeof enDictionary
	? (typeof enDictionary)[K]
	: K extends keyof typeof zhDictionary
		? (typeof zhDictionary)[K]
		: never;

export type Dictionary = {
	[K in AllKeys]: DictionaryValue<K>;
};

/** 字典缓存 - 使用 Map 存储已加载的字典 */
const dictionaryCache = new Map<Locale, Dictionary>();

/** 加载中的字典 - 防止重复加载 */
const loadingPromises = new Map<Locale, Promise<Dictionary>>();

/**
 * 获取指定语言的字典
 *
 * @param locale - 语言代码
 * @returns 对应语言的字典
 * @throws 当语言代码无效或字典加载失败时抛出错误
 */
export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
	// 验证语言代码
	if (!isValidLocale(locale)) {
		throw new Error(
			`无效的语言代码: ${locale}。支持的语言: ${locales.join(', ')}`,
		);
	}

	// 检查缓存
	const cached = dictionaryCache.get(locale);
	if (cached) {
		return cached;
	}

	// 检查是否正在加载
	const loadingPromise = loadingPromises.get(locale);
	if (loadingPromise) {
		return loadingPromise;
	}

	// 创建加载 promise
	const loadPromise = (async () => {
		try {
			// 动态导入字典文件
			const dictionary = await import(`./${locale}.json`).then(
				(m) => m.default,
			);

			// 验证导入的数据
			if (!dictionary || typeof dictionary !== 'object') {
				throw new Error(`字典文件格式无效: ${locale}.json`);
			}

			// 更新缓存
			dictionaryCache.set(locale, dictionary);
			loadingPromises.delete(locale);

			return dictionary;
		} catch (error) {
			// 清理加载状态
			loadingPromises.delete(locale);

			console.error(`加载 ${locale} 字典失败:`, error);

			// 如果当前语言不是默认语言，尝试回退到默认语言
			if (locale !== defaultLocale) {
				console.warn(`回退到默认语言: ${defaultLocale}`);
				try {
					const defaultDict = await getDictionary(defaultLocale);
					return defaultDict;
				} catch (fallbackError) {
					console.error(`回退到默认语言也失败:`, fallbackError);
					// 继续抛出原始错误
				}
			}

			throw new Error(
				`无法加载 ${locale} 字典: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	})();

	// 记录加载中的 promise
	loadingPromises.set(locale, loadPromise);

	return loadPromise;
};

/**
 * 预加载所有语言的字典
 *
 * @returns 包含所有字典的 Promise
 *
 */
export const preloadDictionaries = async (): Promise<void> => {
	const promises = locales.map((locale) =>
		getDictionary(locale).catch((error) => {
			console.warn(`预加载 ${locale} 字典失败:`, error);
			return null;
		}),
	);

	await Promise.all(promises);
};

/**
 * 清除字典缓存
 *
 * @param locale - 可选，指定要清除的语言，不传则清除所有缓存
 *
 */
export const clearDictionaryCache = (locale?: Locale): void => {
	if (locale) {
		dictionaryCache.delete(locale);
		loadingPromises.delete(locale);
	} else {
		dictionaryCache.clear();
		loadingPromises.clear();
	}
};

/**
 * 检查是否为有效语言代码
 *
 * @param value - 要检查的字符串
 * @returns 如果是有效语言代码则返回 true
 *
 */
export const isValidLocale = (value: string): value is Locale => {
	return locales.includes(value as Locale);
};

/**
 * 获取当前已缓存的语言列表
 *
 * @returns 已缓存的语言代码数组
 */
export const getCachedLocales = (): Locale[] => {
	return Array.from(dictionaryCache.keys());
};

/**
 * 检查字典是否已加载
 *
 * @param locale - 语言代码
 * @returns 如果字典已加载则返回 true
 */
export const isDictionaryLoaded = (locale: Locale): boolean => {
	return dictionaryCache.has(locale);
};
