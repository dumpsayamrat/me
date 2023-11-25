import { getCachedPhotoList } from '@/cache/photo'
import { SMALL_PHOTO_SIZE } from '@/constants'
import { generatePageMetadata } from '@/seo'
import Image from 'next/image'

export const metadata = generatePageMetadata({
  title: `gallery`,
  description: `Discover moments frozen in time at dumpsayamrat's Gallery. Through the lenses of film cameras, mirrorless wonders, and iPhones, our collection tells unique stories captured by me and my wife. Join us in celebrating the beauty of diverse perspectives in a visual journey that spans nostalgia, innovation, and the art of everyday life.`,
})

export const revalidate = 'force-cache'

export default async function Gallery() {
  let photos = await getCachedPhotoList()
  photos = photos.concat(photos).concat(photos).concat(photos)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 mx-auto max-w-9xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 col-span-9">
        {photos.map(photo =>
          photo && photo.presignedURL ? (
            <div
              className="relative overflow-hidden shadow-md animate-fade-in"
              key={photo.id}
            >
              <Image
                src={photo.presignedURL}
                alt={photo.title}
                width={SMALL_PHOTO_SIZE}
                height={SMALL_PHOTO_SIZE / photo.aspectRatio}
                blurDataURL={photo.blur}
                placeholder="blur"
              />
            </div>
          ) : null
        )}
      </div>
      <div className="col-span-3 prose lg:prose-xl dark:prose-invert">{''}</div>
    </div>
  )
}
