'use server'

import 'server-only'
import { KV_PHOTO_PREFIX } from '@/constants'
import { kv } from '@vercel/kv'
import { getSignedUpload, put } from '@/s3'

export const uploadTempPhoto = async (
  formData: FormData
): Promise<{ url: string } | null> => {
  const file = formData.get('file') as File
  try {
    const url = await getSignedUpload(file.name, file.size)
    await put(url, file)
    return { url: file.name }
  } catch (err) {
    console.error(err)
  }
  return null
}

export const resetAllDevelopmentPhoto = async (): Promise<void> => {
  const queryKey = `development:${KV_PHOTO_PREFIX}:*`
  const keys = await kv.keys(queryKey)
  await Promise.all(keys.map(key => kv.del(key)))
}
