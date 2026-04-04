import type { Meta } from "..";
import type { Postprocessor } from ".";
import type { EngineScrapeResult } from "../engines";

export const youtubePostprocessor: Postprocessor = {
  name: "youtube",
  shouldRun: (_meta: Meta, url: URL, postProcessorsUsed?: string[]) => {
    if (postProcessorsUsed?.includes("youtube")) {
      return false;
    }

    if (
      url.hostname.endsWith(".youtube.com") ||
      url.hostname === "youtube.com"
    ) {
      return url.pathname === "/watch" && !!url.searchParams.get("v");
    } else if (url.hostname === "youtu.be") {
      return url.pathname !== "/";
    } else {
      return false;
    }
  },
  run: async (meta: Meta, engineResult: EngineScrapeResult) => {
    let initialData;
    try {
      initialData = JSON.parse(
        engineResult.html
          .split("var ytInitialPlayerResponse = ")[1]
          .split(";var meta =")[0],
      );
    } catch (e) {
      meta.logger.warn("Failed to parse YouTube initial data");
      return engineResult;
    }

    const largestThumbnail =
      initialData.videoDetails.thumbnail.thumbnails.slice(-1)[0];
    const lengthSeconds = parseFloat(initialData.videoDetails.lengthSeconds);
    const lengthTrueSeconds = lengthSeconds % 60;
    const lengthMinutes = Math.floor(lengthSeconds / 60) % 60;
    const lengthHours = Math.floor(lengthSeconds / 3600);

    const endscreen = (
      initialData.endscreen?.endscreenRenderer?.elements || []
    ).filter(x => x.endscreenElementRenderer?.style === "VIDEO");

    let preferredCaptionMarkdown = "";

    if (engineResult.youtubeTranscriptContent) {
      const initialSegments =
        engineResult.youtubeTranscriptContent?.actions?.[0]
          ?.updateEngagementPanelAction?.content?.transcriptRenderer?.content
          ?.transcriptSearchPanelRenderer?.body?.transcriptSegmentListRenderer
          ?.initialSegments ?? [];
      const transcriptText = (
        Array.isArray(initialSegments) ? initialSegments : []
      )
        .map(x => x?.transcriptSegmentRenderer?.snippet?.runs?.[0]?.text)
        .filter(Boolean)
        .join(" ");
      preferredCaptionMarkdown = `## Transcript

${transcriptText}
`;
    }

    const markdown = `\
![Thumbnail (${largestThumbnail.width}x${largestThumbnail.height})](${largestThumbnail.url})
# [${initialData.videoDetails.title}](${initialData.microformat.playerMicroformatRenderer.canonicalUrl})

**Visibility**: ${initialData.videoDetails.isPrivate ? "Private" : initialData.microformat.playerMicroformatRenderer.isUnlisted ? "Unlisted" : "Public"}
**Uploaded by**: [${initialData.videoDetails.author}](${initialData.microformat.playerMicroformatRenderer.ownerProfileUrl})
**Uploaded at**: ${initialData.microformat.playerMicroformatRenderer.uploadDate}
**Published at**: ${initialData.microformat.playerMicroformatRenderer.publishDate}
**Length**: ${lengthHours > 0 ? `${lengthHours.toString().padStart(2, "0")}:` : ""}${lengthMinutes.toString().padStart(2, "0")}:${lengthTrueSeconds.toString().padStart(2, "0")}
**Views**: ${initialData.videoDetails.viewCount}
**Likes**: ${initialData.microformat.playerMicroformatRenderer.likeCount}
**Category**: ${initialData.microformat.playerMicroformatRenderer.category}

## Description

\`\`\`
${initialData.videoDetails.shortDescription}
\`\`\`

${preferredCaptionMarkdown ? preferredCaptionMarkdown + "\n\n" : ""}\
${
  endscreen.length > 0
    ? `## Endscreen
    
${endscreen.map(element => `- [${element.endscreenElementRenderer.title.simpleText}](${new URL(element.endscreenElementRenderer.endpoint.commandMetadata.webCommandMetadata.url, engineResult.url).toString()})`).join("\n")}`
    : ""
}`;

    return {
      ...engineResult,
      markdown,
      postprocessorsUsed: [
        ...(engineResult.postprocessorsUsed ?? []),
        "youtube",
      ],
    };
  },
};
