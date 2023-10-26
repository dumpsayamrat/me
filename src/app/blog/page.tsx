import { Loading } from '@/components/Loading'
import { CachedView } from '@/components/View'
import { generatePageMetadata } from '@/seo'
import { allBlogs } from 'contentlayer/generated'
import Link from 'next/link'
import { Suspense } from 'react'

export const metadata = generatePageMetadata({
  title: `blog`,
})

export default async function Home() {
  return (
    <>
      {allBlogs
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1
          }
          return 1
        })
        .map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="mb-4 p-4 transition duration-300 rounded-md"
          >
            <div className="flex flex-col space-y-2">
              <p className="text-xl font-semibold">{post.title}</p>
              <p className="text-gray-500 text-sm">
                Published on{' '}
                {new Date(post.publishedAt).toLocaleString('en-us', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}{' '}
                —{' '}
                <Suspense fallback={<Loading size={'small'} />}>
                  <CachedView slug={post.slug} />
                </Suspense>
              </p>
              <p className="text-gray-700 dark:text-gray-500">{post.summary}</p>
            </div>
          </Link>
        ))}
    </>
  )
}
