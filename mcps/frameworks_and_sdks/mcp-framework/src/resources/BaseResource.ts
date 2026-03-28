export type ResourceContent = {
  uri: string;
  mimeType?: string;
  text?: string;
  blob?: string;
};

export type ResourceDefinition = {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
};

export type ResourceTemplateDefinition = {
  uriTemplate: string;
  name: string;
  description?: string;
  mimeType?: string;
};

export interface ResourceProtocol {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
  resourceDefinition: ResourceDefinition;
  read(): Promise<ResourceContent[]>;
  subscribe?(): Promise<void>;
  unsubscribe?(): Promise<void>;
}

export abstract class MCPResource implements ResourceProtocol {
  abstract uri: string;
  abstract name: string;
  description?: string;
  mimeType?: string;

  get resourceDefinition(): ResourceDefinition {
    return {
      uri: this.uri,
      name: this.name,
      description: this.description,
      mimeType: this.mimeType,
    };
  }

  abstract read(): Promise<ResourceContent[]>;

  async subscribe?(): Promise<void> {
    throw new Error("Subscription not implemented for this resource");
  }

  async unsubscribe?(): Promise<void> {
    throw new Error("Unsubscription not implemented for this resource");
  }

  protected async fetch<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}
