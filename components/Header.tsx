import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-90'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Logo />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden h-6 text-2xl font-semibold sm:block">
              {siteMetadata.headerTitle}
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex w-full items-center justify-between space-x-4 leading-5 sm:space-x-6">
        {/* Desktop and larger screens: Navigation links */}
        <div className="no-scrollbar hidden w-auto items-center space-x-4 overflow-x-auto sm:flex sm:space-x-6 md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/') // Ensure the home page link is excluded
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={
                  link.isButton
                    ? 'rounded border border-yellow-500 bg-transparent px-4 py-2 font-semibold text-yellow-500 hover:border-transparent hover:bg-yellow-500 hover:text-white'
                    : 'block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400'
                }
              >
                {link.title}
              </Link>
            ))}
        </div>

        {/* Mobile only: Toggle button and mobile menu */}
        <div className="flex w-full items-center justify-between sm:hidden">
          <MobileNav />
        </div>

        <ThemeSwitch />
      </div>
    </header>
  )
}

export default Header
