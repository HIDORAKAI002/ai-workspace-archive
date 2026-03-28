// Just the types we need for the API structure - copied from Gradio client library
export interface ApiParameter {
  label: string;
  parameter_name?: string; // Now optional
  parameter_has_default?: boolean;
  parameter_default?: unknown;
  type: string;
  python_type: {
    type: string;
    description?: string;
  };
  component: string;
  example_input?: string;
  description?: string;
}
export interface ApiEndpoint {
  parameters: ApiParameter[];
  returns: {
    label: string;
    type: string;
    python_type: {
      type: string;
      description: string;
    };
    component: string;
  }[];
  type: {
    generator: boolean;
    cancel: boolean;
  };
}
export interface ApiStructure {
  named_endpoints: Record<string, ApiEndpoint>;
  unnamed_endpoints: Record<string, ApiEndpoint>;
}

export type ApiReturn = {
  label: string;
  type: string;
  python_type: {
    type: string;
    description: string;
  };
  component: string;
};
