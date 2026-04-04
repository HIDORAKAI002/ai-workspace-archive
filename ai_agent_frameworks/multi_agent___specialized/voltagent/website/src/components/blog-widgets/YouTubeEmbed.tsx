import type React from "react";

interface YouTubeEmbedProps {
  url: string;
  title?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ url, title = "YouTube Video" }) => {
  // Convert YouTube URLs to embed format
  const getEmbedUrl = (videoUrl: string): string => {
    // Handle various YouTube URL formats
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
    ];

    for (const pattern of patterns) {
      const match = videoUrl.match(pattern);
      if (match?.[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }

    // If already an embed URL or unrecognized format, return as is
    return videoUrl;
  };

  const embedUrl = getEmbedUrl(url);

  return (
    <div className="border-solid bg-white/5 border-[#1e293b]/40 border-2 rounded-lg  my-6">
      <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg bg-gray-900">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed;
