import Footer from '@/components/Footer'
import Navbar from '@/components/NavBar'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="max-w-3xl mx-auto">
        <Navbar />
      </header>
      <main className="mb-auto">{children}</main>
      <Footer />
    </>
  )
}
