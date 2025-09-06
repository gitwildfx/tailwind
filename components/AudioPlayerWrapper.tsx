'use client'

import { useState } from 'react'
import AudioPlayer from './AudioPlayer'

interface Track {
  title: string
  src: string
}

interface AudioPlayerWrapperProps {
  playlist: Track[]
}

export default function AudioPlayerWrapper({ playlist }: AudioPlayerWrapperProps) {
  const [current, setCurrent] = useState(0)

  const nextTrack = () => {
    setCurrent((prev) => (prev + 1) % playlist.length)
  }

  return (
    <div className="flex flex-col space-y-4">
      <AudioPlayer 
        key={current}
        src={playlist[current].src}
        title={playlist[current].title}
      />
      <button
        onClick={nextTrack}
        className="rounded-md bg-green-600 px-4 py-2 mt-2 text-white hover:bg-green-700"
      >
        Next Track
      </button>
    </div>
  )
}
