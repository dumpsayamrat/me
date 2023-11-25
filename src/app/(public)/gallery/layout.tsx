export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <article className="md:mx-4">{children}</article>
}
