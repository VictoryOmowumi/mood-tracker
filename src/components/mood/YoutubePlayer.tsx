import { useEffect, useState } from 'react';

export const YoutubePlayer = ({ playlistId }: { playlistId: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
      <div className="aspect-video w-full">
        {!isLoaded && (
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">
              Loading playlist...
            </div>
          </div>
        )}
        <iframe
          src={`https://www.youtube.com/embed?listType=playlist&list=${playlistId}&autoplay=0&rel=0`}
          className={`h-full w-full ${isLoaded ? 'block' : 'hidden'}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
};