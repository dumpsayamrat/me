import { Photo, PhotoFormData } from '@/type'

export function bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  if (bytes === 0) return '0 Byte'

  const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))), 10)
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i]
}

export const convertFormDataToPhoto = (data: PhotoFormData): Photo => {
  return {
    ...data,
    focalLength: Number(data.focalLength),
    aperture: Number(data.aperture),
    iso: Number(data.iso),
    exposureTime: Number(data.exposureTime),
    exposure: Number(data.exposure),
    aspectRatio: Number(data.aspectRatio),
    takenAt: new Date(data.takenAt).valueOf(),
  }
}
