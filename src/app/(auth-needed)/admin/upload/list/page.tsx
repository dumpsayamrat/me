import Link from 'next/link'
import { getPhotoList } from './action'
import ResetDevelopmentButton from '@/components/photo/ResetDevelopmentButton'

const ListPage = async () => {
  const photos = await getPhotoList()
  return (
    <>
      <div>
        <span>{photos.length} photos</span>
        <div>
          <ResetDevelopmentButton />
        </div>
        {photos.map((photo: any) => (
          <ul key={photo.id} className="py-3">
            {Object.keys(photo).map((key, index) => (
              <li key={index}>
                <strong>{key}:</strong> {photo[key]}
              </li>
            ))}
            <li>
              <Link href={`/admin/upload/${photo.id}`}>Edit</Link>
            </li>
          </ul>
        ))}
      </div>
    </>
  )
}

export default ListPage
