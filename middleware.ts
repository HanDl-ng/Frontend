import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = [
  '/',
  '/signin',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/verify-otp',
  '/pricing',
  '/how-it-works',
  '/privacy',
  '/terms',
  '/contact',
  '/changelog',
  '/status',
  '/docs',
  '/onboarding',
  '/onboarding/complete',
];

const publicPrefixes = ['/docs/', '/api/', '/_next/', '/favicon', '/og.'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.includes(pathname)) return NextResponse.next();
  
  // Allow public prefixes (docs subpages, API routes, static assets)
  if (publicPrefixes.some((prefix) => pathname.startsWith(prefix))) return NextResponse.next();
  
  // Allow static files
  if (pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff2?|ttf|css|js|map|json|txt|xml)$/)) {
    return NextResponse.next();
  }

  // TODO: Re-enable auth protection when backend auth is wired up
  // const token = request.cookies.get('handl_token')?.value;
  //
  // if (pathname.startsWith('/app')) {
  //   if (!token) {
  //     const signInUrl = new URL('/signin', request.url);
  //     signInUrl.searchParams.set('redirect', pathname);
  //     return NextResponse.redirect(signInUrl);
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except _next/static, _next/image, and favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
