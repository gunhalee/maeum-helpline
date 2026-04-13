import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isLang } from '@/lib/i18n'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split('/')[1]

  if (isLang(firstSegment)) {
    return NextResponse.next()
  }

  const nextUrl = request.nextUrl.clone()
  nextUrl.pathname = `/ko${pathname === '/' ? '' : pathname}`

  return NextResponse.redirect(nextUrl, 308)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
}
