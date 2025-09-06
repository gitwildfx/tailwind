// components/AudioPlayerWrapper.tsx
import AudioPlayer from './AudioPlayer'

interface Track {
  title: string
  src: string
}

interface AudioPlayerWrapperProps {
  playlist: Track[]
}

export default function AudioPlayerWrapper({ playlist }: AudioPlayerWrapperProps) {
  return (
    <div className="flex flex-col space-y-4">
      {playlist.map((track, idx) => (
        <AudioPlayer key={idx} src={track.src} title={track.title} />
      ))}
    </div>
  )
}
