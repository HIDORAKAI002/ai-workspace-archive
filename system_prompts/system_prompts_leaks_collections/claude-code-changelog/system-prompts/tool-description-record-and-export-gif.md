# Tool Prompt: record-and-export-gif

- Name: gif_creator

## Summary

Record browser actions and export an annotated animated GIF.

# Raw Prompt Text
Manage GIF recording and export for browser automation sessions. Control when to start${PATH} recording browser actions (clicks, scrolls, navigation), then export as an animated GIF with visual overlays (click indicators, action labels, progress bar, watermark). All operations are scoped to the tab's group. When starting recording, take a screenshot immediately after to capture the initial state as the first frame. When stopping recording, take a screenshot immediately before to capture the final state as the last frame. For export, either provide 'coordinate' to drag${PATH} upload to a page element, or set 'download: true' to download the GIF.
