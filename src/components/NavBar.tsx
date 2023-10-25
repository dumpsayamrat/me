'use client'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import Link from 'next/link'
import { LayoutGroup, motion } from 'framer-motion'
import ThemeSwitcher from './ThemeSwitcher'

const navItems = {
  '/': {
    name: 'me',
  },
  '/blog': {
    name: 'blog',
  },
}

export default function Navbar() {
  let pathname = usePathname() || '/'
  if (pathname.includes('/blog/')) {
    pathname = '/blog'
  }

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <LayoutGroup>
          <motion.nav
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="navbar"
          >
            <ul className="navbar-list">
              {Object.entries(navItems).map(([path, value]) => (
                <motion.li
                  key={path}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={path}
                    className={clsx(
                      'transition-all hover:text-stone-800 dark:hover:text-stone-200 dark:text-stone-200 flex align-middle',
                      {
                        'text-stone-500': !(path === pathname),
                        'dark:text-stone-400': !(path === pathname),
                      }
                    )}
                  >
                    {value.name}
                    {path === pathname ? (
                      <motion.div
                        className="absolute h-[1px] top-7 inset-0 bg-primary-500 dark:bg-stone-100 z-[-1] dark:bg-gradient-to-r from-transparent to-primary-900"
                        layoutId="sidebar"
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    ) : null}
                  </Link>
                </motion.li>
              ))}
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <ThemeSwitcher />
              </motion.li>
            </ul>
          </motion.nav>
        </LayoutGroup>
      </div>
    </aside>
  )
}
