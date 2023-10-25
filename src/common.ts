import { KV_BLOG_VIEW_PREFIX } from './constants'

export const generateBlogKey = (slug: string): string =>
  `${process.env.NODE_ENV}:${KV_BLOG_VIEW_PREFIX}${slug}`

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function waitFor10Seconds(): Promise<void> {
  console.log('Waiting for 10 seconds...')
  await wait(10000) // 10000 milliseconds = 10 seconds
  console.log('Done waiting for 10 seconds!')
}
