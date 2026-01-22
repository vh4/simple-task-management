import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const { pathname } = request.nextUrl;

    const publicPaths = ['/', '/login', '/register'];
    const isPublicPath = publicPaths.includes(pathname);

    if (!accessToken && refreshToken && !isPublicPath) {
        try {
            const refreshResponse = await fetch('http://localhost:3000/api/auth/refresh-token', {
                method: 'POST',
                headers: {
                    'Cookie': `refreshToken=${refreshToken}`
                }
            });

            if (refreshResponse.ok) {
                const response = NextResponse.next();

                const setCookieHeaders = refreshResponse.headers.getSetCookie();
                setCookieHeaders.forEach(cookie => {
                    response.headers.append('set-cookie', cookie);
                });

                return response;
            } else {
                return NextResponse.redirect(new URL('/', request.url))
            }
        } catch (error) {
            console.error('Middleware silent refresh failed:', error);
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    const isAuthenticated = !!(accessToken || refreshToken);

    if (isAuthenticated && isPublicPath) {
        return NextResponse.redirect(new URL('/home', request.url))
    }

    if (!isAuthenticated && !isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/login', '/register', '/home'],
}