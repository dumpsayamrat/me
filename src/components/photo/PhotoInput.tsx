'use client'

import { blobToImage, copyExifData } from '@/utils/blob'
import { useRef, useState } from 'react'
import { Loading } from '../Loading'
import clsx from 'clsx'
import { bytesToSize } from '@/utils/photo'

export default function ImageInput({
  onStart,
  onBlobReady,
  maxSize = 2160,
  quality = 0.99,
  loading,
  debug = true,
}: {
  onStart?: () => void
  onBlobReady?: (blob: Blob, extension?: string, ratio?: number) => void
  maxSize?: number
  quality?: number
  loading?: boolean
  debug?: boolean
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  const [imageDetail, setImageDetail] = useState<{
    fileName?: string
    size?: string
    newSize?: string
    width?: number
    height?: number
    newWidth?: number
    newHeight?: number
  }>()
  const [image, setImage] = useState<Blob>()
  const [imageInputKey, setImageInputKey] = useState<number>(0)

  const handleResetImage = () => {
    setImageDetail(undefined)
    setImage(undefined)
    setImageInputKey(prev => prev + 1)
  }

  const handleDownload = () => {
    if (!image) return
    const url = window.URL.createObjectURL(image)
    const a = document.createElement('a')
    a.href = url
    a.download = 'test.jpg'
    // Trigger a click event on the link to start the download
    a.click()
    window.URL.revokeObjectURL(url) // Clean up the URL
  }

  return (
    <div className="mt-2 flex flex-col justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-500 px-6 py-10">
      <div className={clsx('text-center', image && 'hidden')}>
        {loading ? (
          <Loading />
        ) : (
          <svg
            className="mx-auto h-12 w-12 text-gray-300"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600 dark:text-gray-300">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md bg-gray-300 dark:bg-gray-800 font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2"
          >
            <span>Upload a file</span>
            <input
              key={imageInputKey}
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept={'image/jpg, image/jpeg'}
              disabled={loading}
              onChange={async e => {
                onStart?.()
                const file = e.currentTarget.files?.[0]
                setImageDetail(prev => ({
                  ...prev,
                  fileName: file?.name,
                  size: file?.size ? bytesToSize(file.size) : undefined,
                }))
                const extension = file?.name.split('.').pop()?.toLowerCase()
                const canvas = ref.current
                if (file && canvas) {
                  // Process images that need resizing
                  const image = await blobToImage(file)
                  const { naturalWidth, naturalHeight } = image
                  const ratio = naturalWidth / naturalHeight

                  const width = Math.round(
                    ratio >= 1 ? maxSize : maxSize * ratio
                  )
                  const height = Math.round(
                    ratio >= 1 ? maxSize / ratio : maxSize
                  )

                  setImageDetail(prev => ({
                    ...prev,
                    width: naturalWidth,
                    height: naturalHeight,
                    newWidth: width,
                    newHeight: height,
                  }))

                  canvas.width = width
                  canvas.height = height

                  // Specify wide gamut to avoid data loss while resizing
                  const ctx = canvas.getContext('2d', {
                    colorSpace: 'display-p3',
                  })
                  ctx?.drawImage(image, 0, 0, canvas.width, canvas.height)
                  canvas.toBlob(
                    async blob => {
                      if (blob) {
                        const blobWithExif = await copyExifData(file, blob)
                        setImageDetail(prev => ({
                          ...prev,
                          newSize: bytesToSize(blobWithExif.size),
                        }))
                        setImage(blobWithExif)
                        onBlobReady?.(blobWithExif, extension, ratio)
                      }
                    },
                    'image/jpeg',
                    quality
                  )
                }
              }}
            />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs leading-5">JPEG up to 4MB</p>
      </div>
      <div className="flex flex-row-reverse justify-around w-full">
        {imageDetail && (
          <div>
            <p className="max-w-full truncate text-ellipsis">
              file name: {imageDetail.fileName}
            </p>
            <p className="max-w-full truncate text-ellipsis">
              original size: {imageDetail.size}
            </p>
            <p className="max-w-full truncate text-ellipsis">
              original dimensions: {imageDetail.width} x {imageDetail.height}
            </p>
            <hr className="my-3" />
            <p className="max-w-full truncate text-ellipsis">
              new size: {imageDetail.newSize}
            </p>
            <p className="max-w-full truncate text-ellipsis">
              new dimensions: {imageDetail.newWidth} x {imageDetail.newHeight}
            </p>
            <hr className="my-3" />
            <button
              type="button"
              onClick={handleDownload}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              download
            </button>
            <button
              type="button"
              onClick={handleResetImage}
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              clear
            </button>
            <hr className="my-3" />
            {loading && <Loading />}
          </div>
        )}
        <canvas
          ref={ref}
          className={clsx(
            'bg-gray-50 dark:bg-gray-900/50 rounded-md',
            'border border-gray-200 dark:border-gray-800',
            'w-[400px]',
            (!image || !debug) && 'hidden'
          )}
        />
      </div>
    </div>
  )
}
