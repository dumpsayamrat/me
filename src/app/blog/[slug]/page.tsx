import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allBlogs } from 'contentlayer/generated'
import Balancer from 'react-wrap-balancer'
import { Mdx } from '@/components/Mdx'
import { generatePageMetadata } from '@/seo'
import { Suspense } from 'react'
import View from '@/components/View'
import { ViewIncrement } from './components/ViewIncrement'

function formatDate(date: string) {
  const currentDate = new Date()
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return `${fullDate} (${formattedDate})`
}

export async function generateMetadata({
  params,
}: any): Promise<Metadata | undefined> {
  const post = allBlogs
    .sort((a, b) => {
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
        return -1
      }
      return 1
    })
    .find(post => post.slug === params.slug)
  return generatePageMetadata({
    title: post?.title || 'blog',
    description: post?.summary,
  })
}

export default async function Blog({ params }: any) {
  const post = allBlogs.find(post => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <ViewIncrement slug={params.slug} />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
      ></script>
      <h1 className="font-bold text-2xl tracking-tighter">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)} —{' '}
          <Suspense fallback={<span>loading...</span>}>
            <View slug={params.slug} />
          </Suspense>
        </p>
      </div>
      <Mdx code={post.body.code} />
    </>
  )
}
