import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'

const CustomLink = (props: any) => {
  const href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: any) {
  return (
    <Image
      alt={props.alt}
      style={{ marginBottom: '0.25em', ...(props.style || {}) }}
      {...props}
    />
  )
}

const components = {
  Image: RoundedImage,
  a: CustomLink,
}

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
