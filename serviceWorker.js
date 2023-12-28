const soTiredWebsite = "so-tired-site-v3"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/boss.svg",
  "/assets/desk-m.svg",
  "/assets/desk-v.svg",
  "/assets/desk.svg",
  "/assets/drink.svg",
  "/assets/email.svg",
  "/assets/tel.svg",
  "/assets/fire_document.svg",
  "/assets/good-night.mp3",
  "/assets/mobile.svg",
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