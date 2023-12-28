const soTiredWebsite = "so-tired-site-v3"
const assets = [
  "/so_tired/",
  "/so_tired/index.html",
  "/so_tired/style.css",
  "/so_tired/script.js",
  "/so_tired/assets/boss.svg",
  "/so_tired/assets/desk-m.svg",
  "/so_tired/assets/desk-v.svg",
  "/so_tired/assets/desk.svg",
  "/so_tired/assets/drink.svg",
  "/so_tired/assets/email.svg",
  "/so_tired/assets/tel.svg",
  "/so_tired/assets/fire_document.svg",
  "/so_tired/assets/good-night.mp3",
  "/so_tired/assets/mobile.svg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(soTiredWebsite).then(cache => {
      cache.addAll(assets)
    })
  )
})
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })
