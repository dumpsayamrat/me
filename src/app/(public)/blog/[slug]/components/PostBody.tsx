import { MDXRemote } from 'next-mdx-remote/rsc'

import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkToc from 'remark-toc'
import mdxComponents from './markdown-components'
import rehypePrettyCode from 'rehype-pretty-code'

export function PostBody({ children }: { children: string }) {
  return (
    <MDXRemote
      source={children}
      options={{
        mdxOptions: {
          remarkPlugins: [
            // Adds support for GitHub Flavored Markdown
            remarkGfm,
            // generates a table of contents based on headings
            remarkToc,
          ],
          // These work together to add IDs and linkify headings
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                theme: {
                  dark: 'github-dark-dimmed',
                  light: 'github-light',
                },
                onVisitLine(node: any) {
                  // Prevent lines from collapsing in `display: grid` mode, and allow empty
                  // lines to be copy/pasted
                  if (node.children.length === 0) {
                    node.children = [{ type: 'text', value: ' ' }]
                  }
                },
              },
            ],
            [
              rehypeAutolinkHeadings,
              {
                properties: {
                  className: ['anchor'],
                },
              },
            ]
          ],
        },
      }}
      components={mdxComponents}
    />
  )
}