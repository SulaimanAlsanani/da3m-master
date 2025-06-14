// import createMiddleware from 'next-intl/middleware';
// import {routing} from './i18n/routing';
 
// export default createMiddleware(routing);
 
// export const config = {
//   // Match all pathnames except for
//   // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
//   // - … the ones containing a dot (e.g. `favicon.ico`)
//   matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
// };
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
});

const publicPaths = [
  '/', '/ar', '/en',
  '/ar/login', '/en/login',
  '/ar/register', '/en/register',
  '/ar/verifycode', '/en/verifycode',
  '/ar/ads', '/en/ads',
  '/ar/sections', '/en/sections',
  '/ar/feasibility-study', '/en/feasibility-study',
  '/ar/join-us', '/en/join-us',
  '/favicon.ico'
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let next-intl handle i18n
  const intlResponse = intlMiddleware(request);

  // Allow static files and public paths
  const isPublic = publicPaths.some(
    (path) => pathname === path || pathname.startsWith('/_next') || pathname.startsWith('/images')
  );
  if (isPublic) return intlResponse;

  const token = request.cookies.get('token')?.value;

  if (!token) {
    const locale = pathname.split('/')[1] || 'ar';
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return intlResponse;
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
};