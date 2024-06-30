'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const FullFrameIcon = () => (
  <svg
    width="28"
    height="24"
    viewBox="0 0 28 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Full Frame</title>
    <rect
      x="5.625"
      y="6.625"
      width="16.75"
      height="10.75"
      rx="1"
      strokeWidth="1.25"
    />
    <line x1="5" y1="3.875" x2="23" y2="3.875" strokeWidth="1.25" />
    <line x1="23" y1="20.125" x2="5" y2="20.125" strokeWidth="1.25" />
  </svg>
)

const GridIcon = () => (
  <svg
    width="28"
    height="24"
    viewBox="0 0 28 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Grid</title>
    <rect
      x="5.625"
      y="6.625"
      width="16.75"
      height="10.75"
      rx="1"
      strokeWidth="1.25"
    />
    <line x1="11.375" y1="7" x2="11.375" y2="18" strokeWidth="1.25" />
    <line x1="16.875" y1="7" x2="16.875" y2="18" strokeWidth="1.25" />
    <line x1="5" y1="12.0417" x2="22.3333" y2="12.0417" strokeWidth="1.25" />
  </svg>
)

const PhotoLayoutSwitcher = () => {
  const pathname = usePathname()
  const gridPage = pathname.includes('/grid');
  return (
    <div className="flex justify-center gap-1 mb-4 prose dark:prose-invert mx-auto">
      <Link href="/gallery" className={clsx({
        'text-stone-700': gridPage
      })}>
        <FullFrameIcon />
      </Link>
      <Link href="/gallery/grid" className={clsx({
        'text-stone-700': !gridPage
      })}>
        <GridIcon />
      </Link>
    </div>
  )
}

export default PhotoLayoutSwitcher;
