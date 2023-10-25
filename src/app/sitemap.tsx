import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import { siteMetadata } from '@/site-metadata.mjs'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const blogRoutes = allBlogs.map(post => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }))

  const routes = ['', 'blog'].map(route => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
