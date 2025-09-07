'use client' // Required for client components using hooks

import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the actual AudioPlayer to ensure no SSR issues
const AudioPlayer = dynamic(() => import('./AudioPlayer'), { ssr: false })

interface Track {
  title: string
  src: string
}

interface AudioPlayerClientProps {
  playlist: Track[]
}

export default function AudioPlayerClient({ playlist }: AudioPlayerClientProps) {
  const [current, setCurrent] = useState(0)

  const nextTrack = () => {
    setCurrent((prev) => (prev + 1) % playlist.length)
  }

  if (!playlist || playlist.length === 0) return null

  return (
    <div className="flex flex-col space-y-4">
      <AudioPlayer
        key={current}
        src={playlist[current].src}
        title={playlist[current].title}
      />
      <button
        onClick={nextTrack}
        className="mt-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Next Track
      </button>
    </div>
  )
}
