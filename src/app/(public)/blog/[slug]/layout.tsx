export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <article className="mx-auto">{children}</article>
}
