'use client'

import { useEffect } from 'react'

const HIGHLIGHT_CLASS = 'guide-target-highlight'

export default function GuideHashScroller() {
  useEffect(() => {
    let scrollFrame = 0
    let highlightFrame = 0
    let highlightTimer = 0
    let highlightedTarget: HTMLElement | null = null

    function clearHighlight() {
      window.cancelAnimationFrame(scrollFrame)
      window.cancelAnimationFrame(highlightFrame)
      window.clearTimeout(highlightTimer)
      highlightedTarget?.classList.remove(HIGHLIGHT_CLASS)
      highlightedTarget = null
    }

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

      clearHighlight()
      scrollFrame = window.requestAnimationFrame(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        target.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' })
        target.focus({ preventScroll: true })
        highlightedTarget = target
        highlightFrame = window.requestAnimationFrame(() => {
          target.classList.add(HIGHLIGHT_CLASS)
        })
        highlightTimer = window.setTimeout(clearHighlight, 1800)
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
      clearHighlight()
      window.removeEventListener('hashchange', scrollToCurrentHash)
      document.removeEventListener('click', handleSameHashClick)
    }
  }, [])

  return null
}
