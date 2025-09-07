'use client'

interface AudioPlayerProps {
  src: string
  title: string
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  return (
    <audio controls className="w-full">
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  )
}
