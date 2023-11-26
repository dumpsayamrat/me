'use server'

import { getPresignedURL } from '@/s3'
import { Photo } from '@/type'
import { generatePhotoKey } from '@/utils/common'
import { kv } from '@vercel/kv'
import { cache } from 'react'
import MemoryCache from '@/memory-cache'
import { CACHE_GET_PRESIGNED_KEY, MEMO_CACHE_TIME } from '@/constants'

const memoCache = MemoryCache.getInstance()

export const getCachedPresignedURL = memoCache.cacheFunction(
  getPresignedURL,
  CACHE_GET_PRESIGNED_KEY,
  MEMO_CACHE_TIME
)

export const getPhotoList = async () => {
  const keys = await kv.keys(generatePhotoKey('*'))
  let photos = await Promise.all(
    keys.map(key =>
      kv.hmget<Photo>(
        key,
        ...[
          'title',
          'description',
          'tags',
          'camera',
          'cameraModel',
          'film',
          'filmFormat',
          'focalLength',
          'aperture',
          'iso',
          'exposureTime',
          'aspectRatio',
          'takenAt',
          'createdAt',
          'url',
          'id',
          'blur',
        ]
      )
    )
  )
  photos = photos.sort((a, b) => (b?.createdAt ?? 0) - (a?.createdAt ?? 0))
  const urls = await Promise.all(
    photos.map(photo => (photo?.url ? getPresignedURL(photo?.url) : ''))
  )
  return photos.map((photo, index) => ({
    ...(photo as Photo),
    presignedURL: urls[index],
  }))
}

export const getCachedPhotoList = cache(getPhotoList)
