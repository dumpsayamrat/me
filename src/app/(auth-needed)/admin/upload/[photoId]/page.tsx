import PhotoForm from '@/components/photo/PhotoForm'
import { notFound } from 'next/navigation'
import { updatePhoto } from './actions'

export default async function PhotoEdit({ params }: any) {
  const { photoId } = params

  if (!photoId) {
    notFound()
  }

  return (
    <section className="mx-auto px-5 text-gray-900 dark:text-gray-100">
      <PhotoForm action={updatePhoto} photoId={photoId} />
    </section>
  )
}
