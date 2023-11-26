'use client'
import PhotoUpload from '@/components/photo/PhotoUpload'
import { useState } from 'react'
import styles from './upload.module.scss'
import { savePhoto } from './action'
import { SubmitButton } from '@/components/SubmitButton'
import BlurImageGenerator from '@/components/photo/BlurImageGenerator'

export default function UploadPage() {
  const [fileName, setFileName] = useState('')
  const [fileURL, setFileURL] = useState('')
  const [fileDataURL, setFileDataURL] = useState('')
  const [blurredPhoto, setBlurData] = useState('')
  const [ratio, setRatio] = useState('')
  const [tempPhotoUploadError, setTempPhotoUploadError] =
    useState<null | Boolean>(null)

  const handleOnBlobUploaded = (
    isError: Boolean,
    fileName?: string,
    fileURL?: string,
    ratio?: number,
    dataURL?: string
  ) => {
    setTempPhotoUploadError(isError)
    if (fileName) {
      setFileName(fileName)
    }

    if (fileURL) {
      setFileURL(fileURL)
    }

    if (ratio != undefined) {
      setRatio(String(ratio))
    }

    if (dataURL) {
      setFileDataURL(dataURL)
    }
  }

  const handleBlurPhoto = (blurImageData: string) => {
    setBlurData(blurImageData)
  }

  const handleFormAction = (formData: FormData) => {
    const takenAt = formData.get('takenAt') as string
    formData.append('takenAt', new Date(takenAt).toISOString())
    savePhoto(formData)
  }

  return (
    <section className="mx-auto px-5 text-gray-900 dark:text-gray-100">
      <div className="col-span-full">
        <PhotoUpload onBlobUploaded={handleOnBlobUploaded} />
      </div>
      <BlurImageGenerator
        sourceImage={fileDataURL}
        blurRadius={70}
        onBlurReady={handleBlurPhoto}
      />
      <form action={handleFormAction}>
        <input type="hidden" name="fileName" value={fileName} required />
        <input type="hidden" name="fileURL" value={fileURL} required />
        <input type="hidden" name="blur" value={blurredPhoto} required />
        <input type="hidden" name="aspectRatio" value={ratio} required />
        {tempPhotoUploadError === false && (
          <div className="col-span-full">
            <p className="text-sm text-green-600 dark:text-green-400">
              Photo uploaded successfully!
            </p>
            {blurredPhoto && (
              <p className="text-sm text-green-600 dark:text-green-400">
                Blur photo generated successfully!
              </p>
            )}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 sm:text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
              <div className="sm:col-span-3">
                <label htmlFor="title" className="block">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="description" className="block">
                  Description
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className="sm:col-span-5">
                <label htmlFor="tags" className="block">
                  Tags
                </label>
                <div className="mt-2">
                  <input
                    id="tags"
                    name="tags"
                    type="text"
                    placeholder="Separated list of tags by commas"
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="camera" className="block">
                  Camera
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="camera"
                    id="camera"
                    className={styles.input}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="camera-model" className="block">
                  Camera Model
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="cameraModel"
                    id="camera-model"
                    className={styles.input}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="film" className="block">
                  Film
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="film"
                    id="film"
                    className={styles.input}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="film-format" className="block">
                  Film Format
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="filmFormat"
                    id="film-format"
                    className={styles.input}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="focal-length" className="block">
                  Focal Length
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="focalLength"
                    id="focal-length"
                    className={styles.input}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="aperture" className="block">
                  Aperture
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    step=".1"
                    name="aperture"
                    id="aperture"
                    className={styles.input}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="iso" className="block">
                  iso
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    step=".1"
                    name="iso"
                    id="iso"
                    className={styles.input}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="exposure-time" className="block">
                  Exposure Time
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    step="any"
                    name="exposureTime"
                    id="exposure-time"
                    className={styles.input}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="exposure" className="block">
                  Exposure
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    step=".1"
                    name="exposure"
                    id="exposure"
                    className={styles.input}
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="taken-at" className="block">
                  Taken At
                </label>
                <div className="mt-2">
                  <input
                    type="datetime-local"
                    name="takenAt"
                    id="taken-at"
                    className={styles.input}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-6 text-right">
                <SubmitButton buttonName="Add" />
              </div>
            </div>
          </div>
        )}
        {tempPhotoUploadError === true && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Photo uploaded unsuccessfully!
          </p>
        )}
      </form>
    </section>
  )
}
