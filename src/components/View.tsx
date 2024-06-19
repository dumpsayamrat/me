import { getAllViews } from '@/services/views'
import { generateBlogKey } from '@/utils/common'
import { kv } from '@vercel/kv'

export default async function View({ slug }: { slug: string }) {
  const view = (await kv.get<number>(generateBlogKey(slug))) || 0
  return (
    <span>
      {view} {`view${view > 1 ? 's' : ''}`}
    </span>
  )
}

export async function CachedView({ slug }: { slug: string }) {
  const views = await getAllViews()
  const key = generateBlogKey(slug)
  const view = views[key] || 0
  return (
    <span>
      {view} {`view${view > 1 ? 's' : ''}`}
    </span>
  )
}
