'use server'

import { generatePhotoKey } from '@/utils/common'
import { kv } from '@vercel/kv'

export const getPhotoList = async () => {
  const keys = await kv.keys(generatePhotoKey('*'))
  return Promise.all(
    keys.map(key =>
      kv.hmget(key, ...['id', 'title', 'takenAt', 'createdAt', 'url'])
    )
  )
}
