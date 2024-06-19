import matter from 'gray-matter'
import path from 'path'
import type { Post } from '@/type'
import fs from 'fs/promises'
import { cache } from 'react'

export const getPosts = async () => {
  const blogPath = './content/blog';
  const posts = await fs.readdir(blogPath)
  return Promise.all(
    posts
      .filter((file) => path.extname(file) === '.mdx')
      .map(async (file) => {
        const filePath = path.resolve(blogPath, file)
        const postContent = await fs.readFile(filePath, 'utf8')
        const { data, content } = matter(postContent)
        const slug = file.split('.')[0];
        const structuredData = {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: data.title,
          datePublished: data.publishedAt,
          dateModified: data.publishedAt,
          description: data.summary,
          image: data.image,
          url: `/blog/${slug}`,
          author: {
            '@type': 'Person',
            name: 'Sayamrat Kaewta',
          },
        }

        return { ...data, slug, structuredData, body: content } as Post
      })
  )
}

export const cachedGetPosts = cache?.(getPosts)

export async function getPost(slug: string) {
  const posts = await cachedGetPosts()
  return posts.find((post) => post.slug === slug)
}
