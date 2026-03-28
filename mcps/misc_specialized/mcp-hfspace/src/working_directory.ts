import { Dirent, promises as fs } from "fs";
import path from "path";
import mime from "mime";
import { pathToFileURL } from "url";
import { FALLBACK_MIME_TYPE, treatAsText } from "./mime_types.js";
import { claudeSupportedMimeTypes } from "./mime_types.js";

export interface ResourceFile {
  uri: string;
  name: string;
  mimeType: string;
  size: number;
  lastModified: Date;
  formattedSize?: string; // Add optional formatted size
}

export interface ResourceContents {
  uri: string;
  mimeType: string;
  text?: string;
  blob?: string;
}

export class WorkingDirectory {
  private readonly MAX_RESOURCE_SIZE = 1024 * 1024 * 2;

  constructor(
    private readonly directory: string,
    private readonly claudeDesktopMode: boolean = false,
  ) {}

  async listFiles(recursive = true): Promise<Dirent[]> {
    return await fs.readdir(this.directory, {
      withFileTypes: true,
      recursive,
    });
  }

  async getResourceFile(file: Dirent): Promise<ResourceFile> {
    const fullPath = path.join(file.parentPath || "", file.name);
    const relativePath = path
      .relative(this.directory, fullPath)
      .replace(/\\/g, "/");
    const stats = await fs.stat(fullPath);

    return {
      uri: `file:./${relativePath}`,
      name: file.name,
      mimeType: mime.getType(file.name) || FALLBACK_MIME_TYPE,
      size: stats.size,
      lastModified: stats.mtime,
    };
  }

  async generateFilename(
    prefix: string,
    extension: string,
    mcpToolName: string,
  ): Promise<string> {
    const date = new Date().toISOString().split("T")[0];
    const randomId = crypto.randomUUID().slice(0, 5);
    return path.join(
      this.directory,
      `${date}_${mcpToolName}_${prefix}_${randomId}.${extension}`,
    );
  }

  async saveFile(arrayBuffer: ArrayBuffer, filename: string): Promise<void> {
    await fs.writeFile(filename, Buffer.from(arrayBuffer), {
      encoding: "binary",
    });
  }

  getFileUrl(filename: string): string {
    return pathToFileURL(path.resolve(this.directory, filename)).href;
  }

  async isSupportedFile(filename: string): Promise<boolean> {
    if (!this.claudeDesktopMode) return true;

    try {
      const stats = await fs.stat(filename);
      if (stats.size > this.MAX_RESOURCE_SIZE) return false;

      const mimetype = mime.getType(filename);
      if (!mimetype) return false;
      if (treatAsText(mimetype)) return true;
      return claudeSupportedMimeTypes.some((supported) => {
        if (!supported.includes("/*")) return supported === mimetype;
        const supportedMainType = supported.split("/")[0];
        const mainType = mimetype.split("/")[0];
        return supportedMainType === mainType;
      });
    } catch {
      return false;
    }
  }

  async validatePath(filePath: string): Promise<string> {
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
      return filePath;
    }

    if (filePath.startsWith("file:")) {
      filePath = filePath.replace(/^file:(?:\/\/|\.\/)/, "");
    }

    const normalizedFilePath = path.normalize(path.resolve(filePath));
    const normalizedCwd = path.normalize(this.directory);

    if (!normalizedFilePath.startsWith(normalizedCwd)) {
      throw new Error(`Path ${filePath} is outside of working directory`);
    }

    await fs.access(normalizedFilePath);
    return normalizedFilePath;
  }

  formatFileSize(bytes: number): string {
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }

  async generateResourceTable(): Promise<string> {
    const files = await this.listFiles();
    const resources = await Promise.all(
      files
        .filter((entry) => entry.isFile())
        .map(async (entry) => await this.getResourceFile(entry)),
    );

    if (resources.length === 0) {
      return "No resources available.";
    }

    return `
The following resources are available for tool calls:
| Resource URI | Name | MIME Type | Size | Last Modified |
|--------------|------|-----------|------|---------------|
${resources
  .map(
    (f) =>
      `| ${f.uri} | ${f.name} | ${f.mimeType} | ${this.formatFileSize(f.size)} | ${f.lastModified.toISOString()} |`,
  )
  .join("\n")}

Prefer using the Resource URI for tool parameters which require a file input. URLs are also accepted.`.trim();
  }

  isFileSizeSupported(size: number): boolean {
    return size <= this.MAX_RESOURCE_SIZE;
  }

  async getSupportedResources(): Promise<ResourceFile[]> {
    const files = await this.listFiles();

    const supportedFiles = await Promise.all(
      files
        .filter((entry) => entry.isFile())
        .map(async (entry) => {
          const isSupported = await this.isSupportedFile(entry.name);
          if (!isSupported) return null;
          return await this.getResourceFile(entry);
        }),
    );

    return supportedFiles.filter((file): file is ResourceFile => file !== null);
  }

  async readResource(resourceUri: string): Promise<ResourceContents> {
    const validatedPath = await this.validatePath(resourceUri);
    const file = path.basename(validatedPath);
    const mimeType = mime.getType(file) || FALLBACK_MIME_TYPE;

    const content = this.isMimeTypeText(mimeType)
      ? { text: await fs.readFile(file, "utf-8") }
      : { blob: (await fs.readFile(file)).toString("base64") };

    return {
      uri: resourceUri,
      mimeType,
      ...content,
    };
  }

  private isMimeTypeText(mimeType: string): boolean {
    return (
      mimeType.startsWith("text/") ||
      mimeType === "application/json" ||
      mimeType === "application/javascript" ||
      mimeType === "application/xml"
    );
  }
}
