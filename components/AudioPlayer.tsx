'use client'

import { useState, useRef, useEffect } from 'react'

interface AudioPlayerProps {
  src: string
  title?: string
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', () => setPlaying(false))

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [])

  return (
    <div className="w-full max-w-lg flex-col rounded-lg bg-gray-100 p-4 shadow-md">
      {title && <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>}

      <div className="flex items-center space-x-4">
        <button
          onClick={togglePlay}
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          {playing ? 'Pause' : 'Play'}
        </button>

        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-300">
          <div
            className="rounded-full bg-blue-600 h-2 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <audio ref={audioRef} src={src} className="hidden" controls>
        <track kind="captions" />
      </audio>
    </div>
  )
}
