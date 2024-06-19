import Link from "next/link"
import Image from 'next/image'

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

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  Image: RoundedImage,
  a: CustomLink,
}