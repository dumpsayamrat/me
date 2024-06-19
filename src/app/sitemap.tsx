import { MetadataRoute } from 'next'
import { siteMetadata } from '@/site-metadata'
import { cachedGetPosts } from '@/services/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteMetadata.siteUrl
  const allPosts = await cachedGetPosts();
  const blogRoutes = allPosts.map(post => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }))

  const routes = ['', 'blog', 'gallery'].map(route => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
