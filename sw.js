/// <reference lib="webworker" />
// @ts-check

/** @type {string[]} */
var FILES
/** @type {string} */
var CACHE_NAME

const CACHE_PREFIX = "beta-voltaic:"

const worker = /** @type {ServiceWorkerGlobalScope} */ (/** @type {any} */ (self))

worker.addEventListener("install", event => {
    event.waitUntil((async () => {
        const legacyCaches = await worker.caches.keys()
        const newCache = await worker.caches.open(CACHE_NAME)

        const precacheFiles = new Set(FILES)

        for (const file of precacheFiles) {
            if (file == "/index.html") continue
            const response = await worker.caches.match(file)
            if (response) {
                newCache.put(file, response)
                precacheFiles.delete(file)
            }
        }

        for (const legacyCache of legacyCaches) {
            await caches.delete(legacyCache)
        }

        await newCache.addAll(precacheFiles)

        await worker.skipWaiting()
    })())
})

worker.addEventListener("activate", event => {
    event.waitUntil((async () => {
        await worker.clients.claim()

        for (const client of await worker.clients.matchAll()) {
            client.postMessage({ type: "update" })
        }
    })())
})

worker.addEventListener("fetch", event => {
    const url = event.request.destination == "document" ? "/index.html" : event.request.url

    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME)
        return (await cache.match(url) ?? new Response("404 Not Found : " + url, { status: 404 }))
    })())
})
