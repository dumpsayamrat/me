'use client'

import { useState } from 'react'
import PhotoInput from './PhotoInput'
import { TEMP_UPLOAD_FILE_NAME } from '@/constants'
import { uploadTempPhoto } from './action'
import { blobToDataURL } from '@/utils/blob'
export const dynamic = 'force-dynamic'

const PhotoUpload = ({
  onBlobUploaded,
}: {
  onBlobUploaded?: (
    isError: boolean,
    tempFilePath?: string,
    tempFileURL?: string,
    ratio?: number,
    dataURL?: string
  ) => void
}) => {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <label htmlFor="photo" className="block text-sm font-medium leading-6">
        Photo
      </label>
      <PhotoInput
        loading={loading}
        onStart={() => {
          setLoading(true)
        }}
        onBlobReady={async (blob, extension, ratio) => {
          const formData = new FormData()
          formData.append('file', blob, `${TEMP_UPLOAD_FILE_NAME}.${extension}`)
          try {
            const result = await uploadTempPhoto(formData)
            const dataURL = await blobToDataURL(blob)
            setLoading(false)
            if (result) {
              onBlobUploaded?.(
                false,
                `${TEMP_UPLOAD_FILE_NAME}.${extension}`,
                result.url,
                ratio,
                dataURL
              )
            }
          } catch (error) {
            onBlobUploaded?.(true)
          }
        }}
      />
    </>
  )
}

export default PhotoUpload
