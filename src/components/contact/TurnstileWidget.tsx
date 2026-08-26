'use client'

import { useEffect, useRef } from 'react'

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string
      theme?: 'light' | 'dark' | 'auto'
      callback?: (token: string) => void
      'expired-callback'?: () => void
      'error-callback'?: () => void
    }
  ) => string
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

type Props = {
  siteKey: string
  onToken: (token: string) => void
  resetSignal: number
}

export function TurnstileWidget({ siteKey, onToken, resetSignal }: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onTokenRef = useRef(onToken)
  onTokenRef.current = onToken

  useEffect(() => {
    if (!siteKey) return

    let cancelled = false

    const renderWidget = () => {
      if (cancelled || !hostRef.current || !window.turnstile) return
      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
      widgetIdRef.current = window.turnstile.render(hostRef.current, {
        sitekey: siteKey,
        theme: 'dark',
        callback: (token) => onTokenRef.current(token),
        'expired-callback': () => onTokenRef.current(''),
        'error-callback': () => onTokenRef.current(''),
      })
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-vbiz-turnstile]')
    if (window.turnstile) {
      renderWidget()
    } else if (existing) {
      existing.addEventListener('load', renderWidget)
    } else {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.dataset.vbizTurnstile = '1'
      script.addEventListener('load', renderWidget)
      document.head.appendChild(script)
    }

    return () => {
      cancelled = true
      existing?.removeEventListener('load', renderWidget)
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [siteKey])

  useEffect(() => {
    if (!resetSignal || !widgetIdRef.current || !window.turnstile) return
    window.turnstile.reset(widgetIdRef.current)
    onTokenRef.current('')
  }, [resetSignal])

  if (!siteKey) return null

  return <div ref={hostRef} className="overflow-hidden rounded-xl" />
}
