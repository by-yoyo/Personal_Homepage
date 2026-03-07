import i18nMiddleware from './proxy/i18nMiddleware';

export default i18nMiddleware;

export const config = {
	matcher: [
		// Match all paths except:
		'/((?!api|_next/static|_next/image|favicon.ico|.well-known|sitemap.xml|robots.txt).*)',
	],
};
