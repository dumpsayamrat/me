'use server'

import { kv } from '@vercel/kv'
import { PhotoFormData } from '@/type'
import {
  generateBlobPhotoPrefix,
  generateID,
  generatePhotoKey,
} from '@/utils/common'
import { convertFormDataToPhoto } from '@/utils/photo'
import { copy } from '@/s3'

export const savePhoto = async (formData: FormData): Promise<void> => {
  const {
    fileName,
    fileURL,
    submit: _unused,
    ...data
  } = Object.fromEntries(formData) as PhotoFormData
  const id = generateID()
  const blobName = generateBlobPhotoPrefix(`${id}.${fileName.split('.')[1]}`)
  await copy(fileURL, blobName)
  const photo = convertFormDataToPhoto({
    ...data,
    url: blobName,
    id,
    createdAt: Date.now(),
  } as PhotoFormData)
  await kv.hmset(generatePhotoKey(id), photo)
}
