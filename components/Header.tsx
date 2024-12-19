'use client'

import { useEffect, useState, useMemo } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  // Memoize rotatingHeader to avoid unnecessary recalculation
  const rotatingHeader = useMemo(() => siteMetadata.headerTitle || [], [])

  const [currentText, setCurrentText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!rotatingHeader.length) return

    const typeEffect = () => {
      const word = rotatingHeader[wordIndex]
      if (!isDeleting && charIndex <= word.length) {
        setCurrentText(word.slice(0, charIndex + 1))
        setCharIndex((prev) => prev + 1)
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(word.slice(0, charIndex - 1))
        setCharIndex((prev) => prev - 1)
      } else if (!isDeleting && charIndex === word.length) {
        setTimeout(() => setIsDeleting(true), 1000) // Pause before deleting
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % rotatingHeader.length)
      }
    }

    const typingSpeed = isDeleting ? 100 : 150
    const timer = setTimeout(typeEffect, typingSpeed)
    return () => clearTimeout(timer)
  }, [rotatingHeader, charIndex, isDeleting, wordIndex])

  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={currentText}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Logo />
          </div>
          <div className="hidden h-6 text-2xl font-semibold sm:block">
            {currentText}
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
              >
                {link.title}
              </Link>
            ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
