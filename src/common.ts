import { KV_BLOG_VIEW_PREFIX } from './constants'

export const generateBlogKey = (slug: string): string =>
  `${process.env.NODE_ENV}:${KV_BLOG_VIEW_PREFIX}${slug}`

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function waitForXSeconds(seconds: number): Promise<void> {
  console.log(`Waiting for ${seconds} seconds...`)
  await wait(seconds * 1000)
  console.log(`Done waiting for ${seconds} seconds!`)
}
