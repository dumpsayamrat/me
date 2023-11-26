import 'server-only'

import { kv } from '@vercel/kv'
import { generateBlogKey } from '@/utils/common'
import MemoryCache from '@/memory-cache'
import { CACHE_VIEWS_KEY, MEMO_CACHE_TIME } from '@/constants'

const cache = MemoryCache.getInstance()

export const getAllViews = cache.cacheFunction<{ [key: string]: number }>(
  async () => {
    console.info(`Funtion ${getAllViews.name}: get data from vercel KV`)
    const keys = await kv.keys(generateBlogKey('*'))
    const views: number[] = await kv.mget(...keys)
    return keys.reduce((acc, key: string, index) => {
      acc[key] = views[index]
      return acc
    }, {} as { [key: string]: number })
  },
  CACHE_VIEWS_KEY,
  MEMO_CACHE_TIME
)
