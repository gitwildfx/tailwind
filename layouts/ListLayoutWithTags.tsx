'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="flex items-center justify-between py-10">
      <div>
        {!prevPage ? (
          <span className="cursor-not-allowed text-gray-500 dark:text-gray-400">
            Previous
          </span>
        ) : (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}` : `/${basePath}/page/${currentPage - 1}`}
            className="font-medium text-primary-600 hover:underline dark:text-primary-400"
            rel="prev"
          >
            Previous
          </Link>
        )}
      </div>

      <span className="text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </span>

      <div>
        {!nextPage ? (
          <span className="cursor-not-allowed text-gray-500 dark:text-gray-400">Next</span>
        ) : (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            className="font-medium text-primary-600 hover:underline dark:text-primary-400"
            rel="next"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  const currentTagSlug = pathname.startsWith('/tags/')
    ? decodeURI(pathname.split('/tags/')[1] || '')
    : null

  return (
    <div className="flex gap-8 xl:gap-16">
      {/* Sidebar */}
      <aside className="hidden shrink-0 sm:block sm:w-72 xl:w-80">
        <div className="sticky top-6 space-y-6 rounded-lg bg-gray-50 p-6 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40">
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Tags
          </h3>

          <nav className="space-y-2">
            {pathname.startsWith('/blog') || !currentTagSlug ? (
              <span className="block font-bold uppercase text-primary-500">All Posts</span>
            ) : (
              <Link
                href="/blog"
                className="block font-medium uppercase text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                All Posts
              </Link>
            )}

            {sortedTags.map((tag) => {
              const isActive = currentTagSlug === slug(tag)

              return (
                <div key={tag} className="py-1">
                  {isActive ? (
                    <span className="inline-block rounded bg-primary-50 px-3 py-1.5 text-sm font-bold uppercase text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                      {tag} ({tagCounts[tag]})
                    </span>
                  ) : (
                    <Link
                      href={`/tags/${slug(tag)}`}
                      className="inline-block rounded px-3 py-1.5 text-sm font-medium uppercase text-gray-600 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-primary-400 transition-colors"
                      aria-label={`View posts tagged ${tag}`}
                    >
                      {tag} ({tagCounts[tag]})
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {title}
          </h1>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {displayPosts.length === 0 ? (
            <p className="py-12 text-center text-gray-500 dark:text-gray-400">
              No posts found.
            </p>
          ) : (
            displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post

              return (
                <li key={path} className="py-8">
                  <article className="space-y-4">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date} suppressHydrationWarning>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </dd>
                    </dl>

                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/${path}`}
                          className="text-gray-900 transition-colors hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
                        >
                          {title}
                        </Link>
                      </h2>

                      {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      )}

                      <p className="prose max-w-none text-gray-600 dark:text-gray-300 line-clamp-3">
                        {summary}
                      </p>
                    </div>
                  </article>
                </li>
              )
            })
          )}
        </ul>

        {pagination && pagination.totalPages > 1 && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </div>
    </div>
  )
}
