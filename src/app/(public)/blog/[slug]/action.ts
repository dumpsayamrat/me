'use server'

import { generateBlogKey } from '@/utils/common'
import { kv } from '@vercel/kv'

export default async function incrementView(slug: string) {
  await kv.incr(generateBlogKey(slug))
}
