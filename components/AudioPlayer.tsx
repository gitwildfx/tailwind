'use client'

import { useState, useRef, useEffect } from 'react'

interface Track {
  title: string
  src: string
}

interface AudioPlayerProps {
  playlist: Track[]
}

export default function AudioPlayer({ playlist }: AudioPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loop, setLoop] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = playlist[currentIndex]

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

  const handleNextTrack = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1
      return nextIndex < playlist.length ? nextIndex : 0
    })
    setProgress(0)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', () => {
      if (loop) {
        handleNextTrack()
      } else {
        setPlaying(false)
      }
    })

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [loop, currentIndex])

  useEffect(() => {
    // Auto-play new track if already playing
    if (!audioRef.current) return
    audioRef.current.load()
    if (playing) {
      audioRef.current.play()
    }
  }, [currentIndex])

  return (
    <div className="w-full max-w-lg flex-col rounded-lg bg-gray-100 p-4 shadow-md">
      <h3 className="mb-2 text-lg font-semibold text-gray-800">{currentTrack.title}</h3>

      <div className="flex items-center space-x-4 mb-2">
        <button
          onClick={togglePlay}
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          {playing ? 'Pause' : 'Play'}
        </button>

        <button
          onClick={handleNextTrack}
          className="rounded-md bg-gray-600 px-3 py-2 text-white transition-colors hover:bg-gray-700"
        >
          Next
        </button>

        <button
          onClick={() => setLoop(!loop)}
          className={`rounded-md px-3 py-2 text-white transition-colors ${
            loop ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
          }`}
        >
          {loop ? 'Loop On' : 'Loop Off'}
        </button>
      </div>

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-300 mb-2">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <audio ref={audioRef} className="hidden" controls>
        <source src={currentTrack.src} />
        <track kind="captions" />
      </audio>
    </div>
  )
}
