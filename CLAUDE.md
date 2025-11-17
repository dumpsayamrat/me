# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Personal website and blog for Dump Sayamrat, built with Next.js 14, TypeScript, and Tailwind CSS.

Live site: https://www.dumpsayamrat.com/

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + SASS
- **Content**: MDX with gray-matter for blog posts
- **Animations**: Framer Motion
- **Storage**: AWS S3 + Vercel KV
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## Development Commands

### Start dev server (port 8080, not default 3000)
```bash
npm run dev
```

### Build
```bash
npm run build
```
The postbuild script automatically generates RSS feed (`src/scripts/rss.ts`)

### Lint
```bash
npm run lint
```

## Architecture

### Data Flow
1. **Photo Gallery**: Photos stored in AWS S3 → Metadata in Vercel KV → Served via CDN
   - `src/services/photo.ts`: Fetches photo metadata from Vercel KV
   - `src/utils/photo.ts`: `generateCdnUrl()` transforms S3 paths to CDN URLs
   - Uses React `cache()` for server-side caching (`getCachedPhotoList`)
   - Memory cache layer (`MemoryCache.getInstance()`) for presigned URLs

2. **Blog Posts**: MDX files in `/content` directory → Processed with next-mdx-remote
   - Uses gray-matter for frontmatter parsing
   - Rehype/remark plugins for syntax highlighting, TOC, auto-linked headings
   - RSS feed generated during build process

3. **Image Optimization**: S3 storage → CDN delivery → Next.js Image component
   - **IMPORTANT**: Requires `NEXT_PUBLIC_CDN` environment variable
   - Without it, URLs become "undefined/path/to/image.jpg" and break

### Key Directories
- `src/app/` - Next.js App Router pages
- `src/components/` - React components
- `src/services/` - Server-side business logic (use 'use server' directive)
- `src/utils/` - Helper functions
- `src/scripts/` - Build-time scripts (RSS generation)
- `content/` - MDX blog posts and content
- `dev-history/` - Development history, migration plans, and technical decisions (files prefixed with timestamp YYYYMMDD-)

### Important Files
- `src/constants.ts` - Global constants (photo sizes, cache times)
- `src/s3.ts` - AWS S3 client and presigned URL generation
- `src/site-metadata.ts` - Site configuration
- `src/type.ts` - TypeScript type definitions
- `vercel.json` - Disables auto-deployment on main branch

## Environment Variables
Required for development:
- `NEXT_PUBLIC_CDN` - CDN URL for image optimization (e.g., `https://cdn.example.com`)

## Key Dependencies
- **Content Processing**: next-mdx-remote, gray-matter, remark-gfm, remark-toc
- **Code Highlighting**: rehype-pretty-code, rehype-slug, rehype-autolink-headings
- **Storage**: @aws-sdk/client-s3, @vercel/kv
- **Styling**: clsx, tailwindcss, @tailwindcss/typography
- **Utilities**: date-fns, nanoid

## Notes
- TypeScript strict mode enabled
- Gallery uses EXIF metadata for photos (camera, film, aperture, ISO, etc.)
- Dark mode support via next-themes
- Accessible emoji rendering with @fec/remark-a11y-emoji
