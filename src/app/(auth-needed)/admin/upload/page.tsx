import { savePhoto } from './action'
import PhotoForm from '@/components/photo/PhotoForm'

export default function UploadPage() {
  return (
    <section className="mx-auto px-5 text-gray-900 dark:text-gray-100">
      <PhotoForm action={savePhoto} />
    </section>
  )
}
