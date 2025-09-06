'use client'

import { useState, useRef, useEffect } from 'react'

interface Track {
  title: string
  src: string
}

interface AudioPlayerProps {
  playlist?: Track[]
}

export default function AudioPlayer({ playlist }: AudioPlayerProps) {
  const defaultPlaylist: Track[] = [
    { title: 'Opening Credits', src: '/static/audio/msr/1.Opening Credits.mp3' },
    { title: 'Introduction', src: '/static/audio/msr/2.Introduction.mp3' },
    { title: 'Chapter 1 - Love', src: '/static/audio/msr/Chapter 1 - Love.mp3' },
    { title: 'Chapter 2 - Strength', src: '/static/audio/msr/Chapter 2 - Strength.mp3' },
    { title: 'Closing Credits', src: '/static/audio/msr/Closing Credits.mp3' },
  ]

  const tracks = playlist || defaultPlaylist
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const playNext = () => setCurrentTrack((prev) => (prev + 1) % tracks.length)

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
        src={tracks[currentTrack].src}
        onEnded={playNext}
        className="mb-3 w-full"
      >
        <track kind="captions" src="" />
      </audio>
      <div className="max-h-80 overflow-y-auto rounded-lg border border-gray-300 bg-white p-2 shadow">
        {tracks.map((track, index) => (
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
