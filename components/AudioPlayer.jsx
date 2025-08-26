// components/AudioPlayer.jsx
'use client'

import React, { useState, useRef, useEffect } from 'react'

const AudioPlayer = () => {
  const [isClient, setIsClient] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const playlist = [
    { title: 'Opening Credits', src: '/static/audio/msr/1.Opening Credits.mp3' },
    { title: 'Introduction', src: '/static/audio/msr/2.Introduction.mp3' },
    { title: 'Chapter 1 - Love', src: '/static/audio/msr/Chapter 1 - Love.mp3' },
    { title: 'Chapter 2 - Strength', src: '/static/audio/msr/Chapter 2 - Strength.mp3' },
    { title: 'Chapter 3 - Truth', src: '/static/audio/msr/Chapter 3 - Truth.mp3' },
    { title: 'Chapter 4 - Honor', src: '/static/audio/msr/Chapter 4 - Honor.mp3' },
    { title: 'Chapter 5 - Purity', src: '/static/audio/msr/Chapter 5 - Purity.mp3' },
    { title: 'Chapter 6 - Forgiveness', src: '/static/audio/msr/Chapter 6 - Forgiveness.mp3' },
    { title: 'Chapter 7 - Vision', src: '/static/audio/msr/Chapter 7 - Vision.mp3' },
    { title: 'Chapter 8 - Rest', src: '/static/audio/msr/Chapter 8 - Rest.mp3' },
    { title: 'Chapter 9 - Patience', src: '/static/audio/msr/Chapter 9 - Patience.mp3' },
    { title: 'Chapter 10 - Humility', src: '/static/audio/msr/Chapter 10 - Humility.mp3' },
    { title: 'Chapter 11 - Trust', src: '/static/audio/msr/Chapter 11 - Trust.mp3' },
    { title: 'Chapter 12 - Fight', src: '/static/audio/msr/Chapter 12 - Fight.mp3' },
    { title: 'Chapter 13 - Faith', src: '/static/audio/msr/Chapter 13 - Faith.mp3' },
    { title: 'Chapter 14 - Hope', src: '/static/audio/msr/Chapter 14 - Hope.mp3' },
    { title: 'Chapter 15 - Perseverance', src: '/static/audio/msr/Chapter 15 - Perseverance.mp3' },
    { title: 'Closing Credits', src: '/static/audio/msr/Closing Credits.mp3' },
  ]

  const playNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length)
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }, [currentTrack])

  if (!isClient) return null

  return (
    <div className="mx-auto max-w-md p-4">
      <audio
        ref={audioRef}
        controls
        src={playlist[currentTrack].src}
        onEnded={playNext}
        className="mb-3 w-full"
      >
        <track kind="captions" src="" label="English captions" />
      </audio>

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

export default AudioPlayer
