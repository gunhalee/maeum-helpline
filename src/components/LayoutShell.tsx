'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

export default function LayoutShell({
  nav,
  children,
}: {
  nav: ReactNode
  children: ReactNode
}) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      {!isHome && nav}
      <main className="flex-1">{children}</main>
    </>
  )
}
