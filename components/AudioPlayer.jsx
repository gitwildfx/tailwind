'use client'

import { useState, useRef, useEffect } from 'react'

export default function AudioPlayer({ playlist }) {
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioRef = useRef(null)

  const playNext = () => setCurrentTrack((prev) => (prev + 1) % playlist.length)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }, [currentTrack])

  return (
    <div className="mx-auto max-w-md p-4">
      <audio
        ref={audioRef}
        controls
        src={playlist[currentTrack].src}
        onEnded={playNext}
        className="mb-3 w-full"
      />
      <div className="max-h-80 overflow-y-auto rounded-lg border border-gray-300 bg-white p-2 shadow">
        {playlist.map((track, index) => (
          <button
            key={index}
            onClick={() => setCurrentTrack(index)}
            className={`block w-full rounded-md px-3 py-2 text-left transition ${
              index === currentTrack
                ? 'bg-blue-600 font-semibold text-white'
                : 'text-gray-800 hover:bg-gray-100'
            }`}
          >
            {track.title}
          </button>
        ))}
      </div>
    </div>
  )
}
