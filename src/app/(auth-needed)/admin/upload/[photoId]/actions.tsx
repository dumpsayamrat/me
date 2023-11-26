'use server'

import { PhotoFormData } from '@/type'
import { generatePhotoKey } from '@/utils/common'
import { convertFormDataToPhoto } from '@/utils/photo'
import { kv } from '@vercel/kv'

export const updatePhoto = async (formData: FormData): Promise<void> => {
  const {
    fileName,
    fileURL,
    submit: _unused,
    ...data
  } = Object.fromEntries(formData) as PhotoFormData
  const photo = convertFormDataToPhoto({
    ...data,
    updatedAt: Date.now(),
  } as PhotoFormData)
  await kv.hmset(generatePhotoKey(photo.id), photo)
}
