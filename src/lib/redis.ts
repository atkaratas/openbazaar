import { Redis } from '@upstash/redis'

// Eger ortamda REDIS_URL yoksa (lokal gelistirme veya ücretsiz Vercel), mock bir redis doner ki sistem cokmesin
const getRedisClient = () => {
  try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      return new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    }
  } catch (e) {
    console.warn("Redis baglantisi kurulamadi, fallback calisiyor.")
  }
  return null;
}

export const redis = getRedisClient();

export async function getCachedData(key: string) {
  if (!redis) return null;
  try {
    return await redis.get(key);
  } catch (e) {
    return null;
  }
}

export async function setCachedData(key: string, data: any, ttlSeconds: number = 3600) {
  if (!redis) return;
  try {
    await redis.set(key, data, { ex: ttlSeconds });
  } catch (e) {
    console.error("Redis set error", e);
  }
}
