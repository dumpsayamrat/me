import PhotoLayoutSwitcher from '@/components/PhotoLayoutSwitcher'

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <article className="md:mx-3 max-w-8xl">
      <PhotoLayoutSwitcher />
      <div>{children}</div>
    </article>
  )
}
