self.addEventListener("install", e => {
  console.log("Service Worker installed");
});

self.addEventListener("fetch", e => {
  // 可缓存资源，如需扩展可写这里
});
