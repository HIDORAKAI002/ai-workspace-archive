export type Announcement = {
  id: string;
  title: string;
  message: string;
  severity: "info" | "warning" | "critical";
  date: string;
  readStatus: boolean;
  url?: string;
};

export type VersionInfo = {
  currentVersion: string;
  latestVersion: string;
  updateAvailable: boolean;
  releaseNotes?: string;
};

export type CLIConfig = {
  checkFrequency: "startup" | "daily" | "weekly" | "never";
  showAnnouncements: boolean;
  lastCheck?: number;
  readAnnouncements: string[];
};
