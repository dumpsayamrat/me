import { getCachedPresignedURL } from '@/cache/photo'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = await getCachedPresignedURL(searchParams.get('key'))
  const imageResponse = await fetch(url)
  if (imageResponse.ok) {
    const imageData = await imageResponse.arrayBuffer()
    const contentType =
      imageResponse.headers.get('Content-Type') || 'application/octet-stream'
    return new Response(imageData, {
      status: 200,
      headers: {
        'Content-Type': contentType,
      },
    })
  } else {
    // If fetch was not successful, handle the error
    return new Response('Failed to fetch image', {
      status: imageResponse.status,
    })
  }
}
