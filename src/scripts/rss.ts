import fs from 'fs'
import { Feed } from 'feed'
import { siteMetadata } from '../site-metadata'
import {getPosts} from '../services/posts'


export default async function generateRssFeed() {
  const allBlogs = await getPosts()
  const allPosts = allBlogs.sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1
    }
    return 1
  })
  const siteUrl = siteMetadata.siteUrl

  const feedOptions = {
    title: siteMetadata.title,
    description: siteMetadata.description,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/images/logo.png`,
    favicon: `${siteUrl}/images/favicon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
    generator: siteMetadata.author,
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
    },
  }

  const feed = new Feed(feedOptions)

  allPosts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.summary,
      date: new Date(post.publishedAt),
    })
  })

  fs.writeFileSync('./public/rss.xml', feed.rss2())
}

generateRssFeed()
