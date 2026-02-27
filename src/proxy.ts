import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || "http://13.127.153.218/api";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/owner') || pathname.startsWith('/dashboard')) {
        const cookies = request.headers.get('cookie');

        if (!cookies) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }

        const meRes = await fetch(`${BACKEND_URL}/account/me`, {
            headers: {
                Cookie: cookies,
            },
            cache: 'no-store',
        });

        if (meRes.status === 401) {
            try {
                const refreshRes = await fetch(`${BACKEND_URL}/account/refresh`, {
                    method: 'POST',
                    headers: {
                        Cookie: cookies, // ✅ critical
                    },
                });

                if (refreshRes.ok) {
                    const setCookieHeaders = refreshRes.headers.getSetCookie();

                    const requestHeaders = new Headers(request.headers);
                    let cookieHeader = request.headers.get('cookie') || '';

                    setCookieHeaders.forEach(sc => {
                        const cookiePart = sc.split(';')[0];
                        if (cookiePart) {
                            cookieHeader += `; ${cookiePart}`;
                        }
                    });
                    requestHeaders.set('cookie', cookieHeader);

                    const response = NextResponse.next({
                        request: {
                            headers: requestHeaders,
                        }
                    });

                    setCookieHeaders.forEach((cookie) => {
                        response.headers.append('set-cookie', cookie);
                    });

                    return response;
                }
            } catch (err) {
                console.error('Proxy refresh failed:', err);
            }
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/owner/:path*', '/user/:path*'],
};
