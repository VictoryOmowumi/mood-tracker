

import { useEffect, useRef } from 'react';

export const YoutubePlayer = ({
  playlistId,
  autoPlay = true,
  className = '',
  controls = true
}: {
  playlistId: string;
  autoPlay?: boolean;
  className?: string;
  controls?: boolean;
}) => {
  const playerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!playlistId || !playerRef.current) return;

  // Only add the script if it doesn't exist
  if (!document.getElementById('youtube-iframe-api')) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.id = 'youtube-iframe-api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }

  window.onYouTubeIframeAPIReady = () => {
    new window.YT.Player(playerRef.current!, {
      height: '100%',
      width: '100%',
      playerVars: {
        listType: 'playlist',
        list: playlistId,
        autoplay: autoPlay ? 1 : 0,
        controls: controls ? 1 : 0,
        modestbranding: 1,
        rel: 0
      },
      events: {
        onReady: (event: any) => {
          if (autoPlay) event.target.playVideo();
        }
      }
    });
  };

  return () => {
    delete window.onYouTubeIframeAPIReady;
  };
}, [playlistId, autoPlay, controls]);
  return <div ref={playerRef} className={className} />;
};