const cache = new Map<string, { value: any; expiry: number }>();

export function setCache(key: string, value: any, ttl: number) {
  const expiry = Date.now() + ttl * 1000;
  cache.set(key, { value, expiry });
}

export function getCache(key: string) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  return item.value;
}
