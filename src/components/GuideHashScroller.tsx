'use client'

import { useEffect } from 'react'

export default function GuideHashScroller() {
  useEffect(() => {
    let scrollFrame = 0

    function scrollToCurrentHash() {
      const rawHash = window.location.hash
      if (rawHash.length <= 1) return

      let id: string
      try {
        id = decodeURIComponent(rawHash.slice(1))
      } catch {
        return
      }

      const target = document.getElementById(id)
      if (!(target instanceof HTMLElement) || !target.classList.contains('scroll-target')) return

      window.cancelAnimationFrame(scrollFrame)
      scrollFrame = window.requestAnimationFrame(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        target.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' })
        target.focus({ preventScroll: true })
      })
    }

    function handleSameHashClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (!(event.target instanceof Element)) return
      const anchor = event.target.closest<HTMLAnchorElement>('a[data-guide-anchor]')
      if (!anchor || anchor.hash !== window.location.hash) return

      event.preventDefault()
      scrollToCurrentHash()
    }

    scrollToCurrentHash()
    window.addEventListener('hashchange', scrollToCurrentHash)
    document.addEventListener('click', handleSameHashClick)

    return () => {
      window.cancelAnimationFrame(scrollFrame)
      window.removeEventListener('hashchange', scrollToCurrentHash)
      document.removeEventListener('click', handleSameHashClick)
    }
  }, [])

  return null
}
