export type Photo = {
  title: string
  description: string
  tags: string
  camera: string
  cameraModel: string
  film: string
  filmFormat: string
  focalLength: number
  aperture: number
  iso: number
  exposureTime?: number
  exposure?: number
  aspectRatio: number
  takenAt: number
  createdAt: number
  updatedAt: number
  url: string
  pathname: string
  id: string
  blur: string
  presignedURL?: string
  [key: string]: any
}

export type PhotoFormData = Photo & {
  fileName: string
  fileURL: string
  [k: string]: FormDataEntryValue
}
