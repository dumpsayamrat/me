import { getCachedPhotoList } from '@/services/photo'
import LocalDate from '@/components/LocalDate'
import { LARGE_PHOTO_SIZE } from '@/constants'
import { generatePageMetadata } from '@/seo'
import { convertDecimalToExposure } from '@/utils/common'
import Image from 'next/image'

export const metadata = generatePageMetadata({
  title: `gallery`,
  description: `Discover moments frozen in time at dumpsayamrat's Gallery. Through the lenses of film cameras, mirrorless wonders, and iPhones, our collection tells unique stories captured by me and my wife. Join us in celebrating the beauty of diverse perspectives in a visual journey that spans nostalgia, innovation, and the art of everyday life.`,
})

export const revalidate = 'force-cache'

export default async function Gallery() {
  const photos = await getCachedPhotoList()
  return (
    <div className="grid gap-1">
      {photos.map(photo =>
        photo && photo.url ? (
          <div
            key={photo.id}
            className="grid gap-x-4 grid-cols-1 md:grid-cols-2"
          >
            <div className="relative overflow-hidden flex items-center animate-fade-in m-w-[1200px]">
              <Image
                src={photo.url}
                alt={photo.title}
                width={LARGE_PHOTO_SIZE}
                height={LARGE_PHOTO_SIZE / photo.aspectRatio}
                blurDataURL={photo.blur}
                placeholder="blur"
                quality={100}
                style={{width: LARGE_PHOTO_SIZE, height: 'auto'}}
              />
            </div>
            <div className="sticky top-4 self-start animate-fade-in-left prose lg:prose-xl dark:prose-invert">
              <h3 className="text-xl font-bold mb-2 uppercase">
                {photo.title}
              </h3>
              <div className="text-sm">
                <p className="font-bold uppercase text-lg">
                  {photo.camera} {photo.cameraModel} <br />
                  <span className="text-base capitalize">
                    {photo.film}{' '}
                    {photo.filmFormat ? `— ${photo.filmFormat}` : ''}
                  </span>
                </p>
                <p className="text-base">
                  {photo.focalLength} mm <br />
                  ƒ/{photo.aperture} <br />
                  ISO {photo.iso} <br />
                  {photo.exposureTime ? (
                    <>
                      <span>
                        {convertDecimalToExposure(photo.exposureTime)}s
                      </span>
                      <br />
                    </>
                  ) : null}
                  {photo.exposure !== undefined && (
                    <span>{photo.exposure} ev</span>
                  )}
                </p>
                <p className="text-sm">
                  <LocalDate date={photo.takenAt} />
                </p>
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  )
}
