'use server'

import { generateBlogKey } from '@/common'
import { kv } from '@vercel/kv'

export default async function incrementView(slug: string) {
  await kv.incr(generateBlogKey(slug))
}
