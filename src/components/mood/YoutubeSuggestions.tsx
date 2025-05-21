import { moods } from '@/types/mood';

export const YoutubeSuggestions = ({ mood }: { mood: keyof typeof moods }) => {
  const playlistId = moods[mood].playlistId;

  return (
    <div className="aspect-video w-full">
      <iframe
        src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=0`}
        title={`${mood} playlist`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="w-full h-full rounded-lg"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};