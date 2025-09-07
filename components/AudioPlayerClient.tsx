'use client'
import { useState } from 'react'

interface Track {
  title: string
  src: string
}

interface AudioPlayerClientProps {
  playlist: Track[]
}

export default function AudioPlayerClient({ playlist }: AudioPlayerClientProps) {
  const [current, setCurrent] = useState(0)

  const nextTrack = () => setCurrent((prev) => (prev + 1) % playlist.length)

  if (!playlist || playlist.length === 0) return null

  return (
    <div className="flex flex-col space-y-4">
      {/* Audio element for current track */}
      <audio key={current} controls className="w-full">
        <source src={playlist[current].src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={nextTrack}
        className="mt-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Next Track
      </button>
    </div>
  )
}
