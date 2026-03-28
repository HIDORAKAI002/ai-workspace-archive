import React from 'react';

export default function YouTubeVideoEmbed({ videoId }) {
  return (
    <iframe
      width="700"
      height="400"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="ExecuteAutomation YouTube"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}