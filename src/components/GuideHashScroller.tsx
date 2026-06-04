'use client'

import { useEffect } from 'react'

const HIGHLIGHT_CLASS = 'guide-target-highlight'

function scrollToCurrentHash() {
  const rawHash = window.location.hash
  if (!rawHash || rawHash.length <= 1) return

  const id = decodeURIComponent(rawHash.slice(1))
  const target = document.getElementById(id)

  if (!(target instanceof HTMLElement)) return

  window.requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    target.focus({ preventScroll: true })
    target.classList.remove(HIGHLIGHT_CLASS)

    window.requestAnimationFrame(() => {
      target.classList.add(HIGHLIGHT_CLASS)
    })

    window.setTimeout(() => {
      target.classList.remove(HIGHLIGHT_CLASS)
    }, 1800)
  })
}

export default function GuideHashScroller() {
  useEffect(() => {
    scrollToCurrentHash()

    window.addEventListener('hashchange', scrollToCurrentHash)

    return () => {
      window.removeEventListener('hashchange', scrollToCurrentHash)
    }
  }, [])

  return null
}
