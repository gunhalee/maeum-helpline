'use client'

import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function LangRedirect() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname !== '/' || searchParams.has('lang')) {
      return
    }

    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.set('lang', 'ko')
    router.replace(`${pathname}?${nextParams.toString()}`)
  }, [pathname, router, searchParams])

  return null
}
