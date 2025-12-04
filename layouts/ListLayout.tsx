'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

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
          <span className="text-gray-500 dark:text-gray-400 cursor-not-allowed">
            ← Previous
          </span>
        ) : (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}` : `/${basePath}/page/${currentPage - 1}`}
            className="font-medium text-primary-600 dark:text-primary-400 hover:underline"
            rel="prev"
          >
            ← Previous
          </Link>
        )}
      </div>

      <span className="text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </span>

      <div>
        {!nextPage ? (
          <span className="text-gray-500 dark:text-gray-400 cursor-not-allowed">
            Next →
          </span>
        ) : (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            className="font-medium text-primary-600 dark:text-primary-400 hover:underline"
            rel="next"
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')

  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = `${post.title} ${post.summary} ${post.tags?.join(' ')}`
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-6 pb-8 pt-6 md:space-y-8">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {title}
          </h1>

          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
            />
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!filteredBlogPosts.length && searchValue && (
            <p className="py-12 text-center text-gray-500 dark:text-gray-400">
              No posts found for "{searchValue}"
            </p>
          )}

          {displayPosts.map((post) => {
            const { path, date, title, summary, tags } = post

            return (
              <li key={path} className="py-8">
                <article className="grid gap-4 xl:grid-cols-4 xl:items-baseline xl:gap-8">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                  </div>

                  <div className="space-y-4 xl:col-span-3">
                    <div>
                      <h2 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/${path}`}
                          className="text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {title}
                        </Link>
                      </h2>

                      {tags && tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="prose max-w-none text-gray-600 dark:text-gray-300 line-clamp-3">
                      {summary}
                    </p>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
