import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const { pathname, searchParams } = request.nextUrl;
  const urlToken = searchParams.get('token');
  
  // Check if this is a theme page
  const isThemePage = pathname.startsWith('/theme/');
  
  // If it's a theme page and has a token in URL, allow access
  if (isThemePage && urlToken) {
    return NextResponse.next();
  }

  // Protected routes patterns
  const protectedRoutes = [
    '/profile',
    '/theme',
    '/dashboard',
    '/theme/LCK',
    '/theme/LEC',
    '/theme/LCP',
    '/theme/FirstStand2025'
  ];
  
  // Check if the current path matches any protected route
  const isProtectedRoute = protectedRoutes.some(route => {
    // Exact match for specific theme routes
    if (route.includes('/theme/')) {
      return pathname === route;
    }
    // Prefix match for general routes
    return pathname.startsWith(route);
  });

  // If it's a protected route and there's no token in cookies or URL, redirect to login
  if (isProtectedRoute && !token && !urlToken) {
    const url = new URL('/auth/login', request.url);
    return NextResponse.redirect(url);
  }

  // If user is logged in and tries to access login page, redirect to dashboard
  // But don't redirect if they're trying to access a theme page
  if (pathname === '/auth/login' && (token || urlToken) && !isThemePage) {
    const url = new URL('/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile',
    '/profile/:path*',
    '/theme',
    '/theme/:path*',
    '/dashboard',
    '/dashboard/:path*',
    '/auth/login'
  ]
}; 