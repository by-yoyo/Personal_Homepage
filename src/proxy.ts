import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isValidLocale } from "./dictionaries";
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

/**
 * i18n middleware that redirects to the appropriate language version
 * Shows language in URL path for better UX and SEO
 */
export default function i18nMiddleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  
  // Skip if already has a valid locale prefix
  const firstSegment = pathname.split('/')[1];
  /*
  if (isValidLocale(firstSegment)) {
    return NextResponse.next();
  }
  */

	if (isValidLocale(firstSegment)) {
		// 如果是 /{locale} 格式（只有语言段），重定向到 /{locale}/profile
		const pathSegments = pathname
			.split('/')
			.filter((segment) => segment !== '');
		if (pathSegments.length === 1) {
			// 只有语言段，没有其他路径
			const redirectUrl = new URL(req.nextUrl);
			redirectUrl.pathname = `/${firstSegment}/profile`;
			redirectUrl.search = search;
			return NextResponse.redirect(redirectUrl);
		}
		// 其他情况（如 /{locale}/profile, /{locale}/about 等）正常处理
		return NextResponse.next();
	}
  
  // Get preferred language from browser
  const acceptLanguage = req.headers.get('accept-language') || '';
  const negotiator = new Negotiator({ 
    headers: { 'accept-language': acceptLanguage } 
  });
  
  try {
    const languages = negotiator.languages();
    const matchedLocale = match(languages, locales as unknown as string[], defaultLocale);
    
    // Create redirect URL with locale
    const redirectUrl = new URL(req.nextUrl);
    if (pathname === '/') {
			redirectUrl.pathname = `/${matchedLocale}/profile`;
		} else {
			redirectUrl.pathname = `/${matchedLocale}${pathname}`;
		}
    
    // Preserve query parameters
    redirectUrl.search = search;
    
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Language detection failed:', error);
    
    // Fallback to default locale
    const fallbackUrl = new URL(req.nextUrl);
    fallbackUrl.pathname = `/${defaultLocale}${pathname}`;
    fallbackUrl.search = search;
    
    return NextResponse.redirect(fallbackUrl);
  }
}

export const config = {
  matcher: [
    // Match all paths except:
    '/((?!api|_next/static|_next/image|favicon.ico|.well-known|sitemap.xml|robots.txt).*)',
  ],
};
