import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang')

  if (!lang) {
    return NextResponse.next()
  }

  const response = NextResponse.next()
  response.cookies.set('lang', lang.toLowerCase() === 'en' ? 'en' : 'ko', {
    path: '/',
    sameSite: 'lax',
  })
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml).*)'],
}
