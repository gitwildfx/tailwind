// src/components/MDXComponents.tsx

import type { MDXComponents } from 'mdx/types'

// Pliny UI components
import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'

// Local custom components
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import AudioPlayer from '@/components/HomepageFeatures/AudioPlayer'

/**
 * MDXComponents provides custom React components
 * that can be used directly inside .mdx files.
 *
 * Example usage in MDX:
 * 
 * ```mdx
 * <AudioPlayer />
 * <TOCInline toc={toc} />
 * ```
 */
export const components: MDXComponents = {
  // Default overrides
  Image,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,

  // Pliny extras
  TOCInline,
  BlogNewsletterForm,

  // Custom site components
  AudioPlayer,
}
