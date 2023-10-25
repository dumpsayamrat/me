export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <article className="prose lg:prose-xl dark:prose-invert mx-auto">
      {children}
    </article>
  )
}
