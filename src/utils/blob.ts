export const blobToImage = (blob: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    // Create a FileReader to read the Blob
    const reader = new FileReader()

    // Handle FileReader errors
    reader.onerror = () => reject('Error reading image')

    // Create an HTMLImageElement
    const image = new Image()

    // Resolve the Promise when the image is loaded
    image.onload = () => resolve(image)

    // Handle image loading errors
    image.onerror = () => reject('Error loading image')

    // Read the Blob as a Data URL
    reader.onload = e => {
      const result = (e.currentTarget as any).result
      image.src = result
    }

    reader.readAsDataURL(blob)
  })
}

export async function copyExifData(
  srcImageBlob: Blob,
  destImageBlob: Blob,
  type = 'image/jpeg'
) {
  const exifData = await extractExifData(srcImageBlob)
  const header = destImageBlob.slice(0, 2)
  const footer = destImageBlob.slice(2)
  return new Blob([header, exifData, footer], { type })
}

const SOS_MARKER = 0xffda
const APP1_MARKER = 0xffe1
const EXIF_HEADER = 0x45786966

const extractExifData = (imageBlob: Blob): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    // Handle the load event
    reader.addEventListener('load', e => {
      const buffer = e.target!.result as ArrayBuffer
      const view = new DataView(buffer)
      let offset = 0

      // Check if it's a valid JPEG
      if (view.getUint16(offset) !== 0xffd8) {
        return reject('Not a valid JPEG')
      }

      offset += 2

      while (true) {
        const marker = view.getUint16(offset)

        if (marker === SOS_MARKER) break

        const size = view.getUint16(offset + 2)

        if (
          marker === APP1_MARKER &&
          view.getUint32(offset + 4) === EXIF_HEADER
        ) {
          return resolve(imageBlob.slice(offset, offset + 2 + size))
        }

        offset += 2 + size
      }

      return resolve(new Blob())
    })

    reader.readAsArrayBuffer(imageBlob)
  })

export function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Invalid data URL'))
      }
    }
    reader.readAsDataURL(blob)
  })
}
