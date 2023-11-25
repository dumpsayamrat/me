import Avatar from '@/components/Avatar'
import { generatePageMetadata } from '@/seo'
import { siteMetadata } from '@/site-metadata.mjs'
import Link from 'next/link'

export const metadata = generatePageMetadata({
  title: `me`,
})

export default async function Home() {
  return (
    <div className="items-start space-y-2 xl:grid xl:gap-x-8 xl:space-y-0 max-w-3xl mx-auto">
      <div className="flex flex-col items-center space-x-2">
        <Avatar />
        <div className="prose lg:prose-xl dark:prose-invert mx-auto">
          <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight text-center">
            {siteMetadata.author}
            <div className="text-gray-500 dark:text-gray-400 text-base">
              {siteMetadata.authorShortDescription}
            </div>
          </h3>
          <p>
            Hello, I&apos;m Sayamrat Kaewta, a dynamic and quick-learning
            software engineer based in Bangkok, Thailand. With over 6 years of
            experience in software development, I have a deep passion for
            crafting high-quality code that delivers top-notch performance.
          </p>
          <p>
            My expertise lies in designing both small and large-scale
            applications, covering both front-end and back-end development. My
            career has been marked by a commitment to excellence and a knack for
            optimizing application performance.
          </p>
          <p>
            I take pride in my ability to turn innovative ideas into real-world
            software solutions. If you&apos;re looking for a software engineer
            with a passion for code quality and performance, you&apos;ve come to
            the right place.
          </p>
          <p>
            <Link href="/">dumpsayamrat.com</Link>, it is your source for coding
            insights and captivating photo galleries. Explore the art of
            programming and discover the beauty of photography. Join me in this
            dual journey of code and visuals. Let&apos;s explore together!
          </p>
          <p className="text-right">Enjoy!</p>
        </div>
      </div>
    </div>
  )
}
