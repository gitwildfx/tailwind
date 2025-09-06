'use client'

import AudioPlayer from './AudioPlayer'

export default function AudioPlayerWrapper({ playlist }: { playlist: { title: string; src: string }[] }) {
  return <AudioPlayer playlist={playlist} />
}
