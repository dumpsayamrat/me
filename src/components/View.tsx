import { generateBlogKey } from '@/common'
import { kv } from '@vercel/kv'

export default async function View({ slug }: { slug: string }) {
  const view = (await kv.get<number>(generateBlogKey(slug))) || 0
  return (
    <span>
      {view} {`view${view > 1 ? 's' : ''}`}
    </span>
  )
}
