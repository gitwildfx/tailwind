import React, { useState, useRef, useEffect } from 'react'

const AudioMsrPlayer = () => {
  const [isClient, setIsClient] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioMsrRef = useRef(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const playlist = [
    { title: 'Opening Credits', src: '/audio/msr/1.Opening Credits.mp3' },
    { title: 'Introduction', src: '/audio/msr/2.Introduction.mp3' },
    { title: 'Chapter 1 - Love', src: '/audio/msr/Chapter 1 - Love.mp3' },
    { title: 'Chapter 2 - Strength', src: '/audio/msr/Chapter 2 - Strength.mp3' },
    { title: 'Chapter 3 - Truth', src: '/audio/msr/Chapter 3 - Truth.mp3' },
    { title: 'Chapter 4 - Honor', src: '/audio/msr/Chapter 4 - Honor.mp3' },
    { title: 'Chapter 5 - Purity', src: '/audio/msr/Chapter 5 - Purity.mp3' },
    { title: 'Chapter 6 - Forgiveness', src: '/audio/msr/Chapter 6 - Forgiveness.mp3' },
    { title: 'Chapter 7 - Vision', src: '/audio/msr/Chapter 7 - Vision.mp3' },
    { title: 'Chapter 8 - Rest', src: '/audio/msr/Chapter 8 - Rest.mp3' },
    { title: 'Chapter 9 - Patience', src: '/audio/msr/Chapter 9 - Patience.mp3' },
    { title: 'Chapter 10 - Humility', src: '/audio/msr/Chapter 10 - Humility.mp3' },
    { title: 'Chapter 11 - Trust', src: '/audio/msr/Chapter 11 - Trust.mp3' },
    { title: 'Chapter 12 - Fight', src: '/audio/msr/Chapter 12 - Fight.mp3' },
    { title: 'Chapter 13 - Faith', src: '/audio/msr/Chapter 13 - Faith.mp3' },
    { title: 'Chapter 14 - Hope', src: '/audio/msr/Chapter 14 - Hope.mp3' },
    { title: 'Chapter 15 - Perseverance', src: '/audio/msr/Chapter 15 - Perseverance.mp3' },
    { title: 'Closing Credits', src: '/audio/msr/Closing Credits.mp3' },
  ]

  const playNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length)
  }

  useEffect(() => {
    if (audioMsrRef.current) {
      audioMsrRef.current.play()
    }
  }, [currentTrack])

  if (!isClient) return null

  return (
    <div className="max-w-md mx-auto p-4">
      <audio
        ref={audioMsrRef}
        controls
        src={playlist[currentTrack].src}
        onEnded={playNext}
        className="w-full mb-3"
      >
        <track kind="captions" src="" label="English captions" />
      </audio>

      <div className="max-h-80 overflow-y-auto border border-gray-300 rounded-lg p-2 bg-white shadow">
        {playlist.map((track, index) => (
          <button
            key={index}
            onClick={() => setCurrentTrack(index)}
            className={`block w-full text-left px-3 py-2 rounded-md transition ${
              index === currentTrack
                ? 'bg-blue-600 text-white font-semibold'
                : 'hover:bg-gray-100 text-gray-800'
            }`}
          >
            {track.title}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AudioMsrPlayer
