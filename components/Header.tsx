import { useEffect, useState } from 'react';
import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import Logo from '@/data/logo.svg';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';

const Header = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const rotatingHeader = siteMetadata.rotatingHeader || []; // Pull words from siteMetadata

  // Typewriter effect logic
  useEffect(() => {
    if (rotatingHeader.length === 0) return;

    const typeWord = () => {
      if (charIndex < rotatingHeader[wordIndex].length) {
        setCurrentWord((prev) => prev + rotatingHeader[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(deleteWord, 1000); // Delay before deleting
      }
    };

    const deleteWord = () => {
      if (charIndex > 0) {
        setCurrentWord((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % rotatingHeader.length); // Move to the next word
        setTimeout(typeWord, 500); // Delay before typing the next word
      }
    };

    const timeout = setTimeout(typeWord, 150); // Typing speed
    return () => clearTimeout(timeout); // Cleanup timeout
  }, [charIndex, wordIndex, rotatingHeader]);

  let headerClass = 'flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10';
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50';
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="mr-3">
            <Logo />
          </div>
          <div className="hidden h-6 text-2xl font-semibold sm:block">
            {siteMetadata.headerTitle}{' '}
            <span className="font-mono text-primary-500">{currentWord}</span>
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
  );
};

export default Header;
