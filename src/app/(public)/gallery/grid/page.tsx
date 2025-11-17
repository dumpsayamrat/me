import { getCachedPhotoList } from '@/services/photo'
import { SMALL_PHOTO_SIZE } from '@/constants'
import { generatePageMetadata } from '@/seo'
import Image from 'next/image'

export const metadata = generatePageMetadata({
    title: `gallery`,
    description: `Discover moments frozen in time at dumpsayamrat's Gallery. Through the lenses of film cameras, mirrorless wonders, and iPhones, our collection tells unique stories captured by me and my wife. Join us in celebrating the beauty of diverse perspectives in a visual journey that spans nostalgia, innovation, and the art of everyday life.`,
})

export const dynamic = 'force-dynamic'

export default async function Gallery() {
    const photos = await getCachedPhotoList()
    return (
        <div className="grid gap-1">
            <div className="grid grid-cols-2md:grid-cols-3 lg:grid-cols-4 gap-1">
                {photos.map(photo =>
                    photo && photo.url ? (
                        <div
                            className="relative overflow-hidden shadow-md animate-fade-in"
                            key={photo.id}
                        >
                            <Image
                                src={photo.url}
                                alt={photo.title}
                                width={SMALL_PHOTO_SIZE}
                                height={SMALL_PHOTO_SIZE / photo.aspectRatio}
                                blurDataURL={photo.blur}
                                placeholder="blur"
                            />
                        </div>
                    ) : null,
                )}
            </div>
            <div className="col-span-3 prose lg:prose-xl dark:prose-invert">
                {''}
            </div>
        </div>
    )
}
