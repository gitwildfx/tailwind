'use client'

interface AudioPlayerProps {
  src: string
  title: string
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <p className="text-sm font-medium">{title}</p>
      <audio controls className="w-full">
        <source src={src} type="audio/mpeg" />
        <track kind="captions" srcLang="en" label="English captions" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}
