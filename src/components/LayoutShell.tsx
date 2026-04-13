'use client'

import type { ReactNode } from 'react'

export default function LayoutShell({
  nav,
  children,
}: {
  nav: ReactNode
  children: ReactNode
}) {
  return (
    <>
      {nav}
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  )
}
