import AudioPlayer from './AudioPlayer'

interface Track {
  title: string
  src: string
}

export default function AudioPlayerWrapper({ playlist }: { playlist: Track[] }) {
  return (
    <div className="flex flex-col space-y-4">
      {playlist.map((track, idx) => (
        <AudioPlayer key={idx} src={track.src} title={track.title} />
      ))}
    </div>
  )
}
