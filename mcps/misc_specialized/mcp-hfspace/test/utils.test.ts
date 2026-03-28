import { describe, it, expect } from "vitest";
import type { ApiEndpoint, ApiParameter } from "../src/gradio_api";
import { convertParameter } from "../src/gradio_convert";

function createParameter(
  override: Partial<ApiParameter> & {
    // Require the essential bits we always need to specify
    python_type: {
      type: string;
      description?: string;
    };
  }
): ApiParameter {
  return {
    label: "Test Parameter",
    // parameter_name is now optional
    type: "string",
    component: "Textbox",
    // Spread the override at the end to allow overriding defaults
    ...override,
  };
}

// Test just the parameter conversion
describe("basic conversions", () => {
  it("converts a single basic string parameter", () => {
    const param = createParameter({
      python_type: {
        type: "str",
        description: "A text parameter",
      },
    });
    const result = convertParameter(param);

    // TypeScript ensures result matches ParameterSchema
    expect(result).toEqual({
      type: "string",
      description: "A text parameter",
    });
  });

  it("uses python_type description when available", () => {
    const param = createParameter({
      label: "Prompt",
      python_type: {
        type: "str",
        description: "The input prompt text",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "string",
      description: "The input prompt text",
    });
  });

  it("falls back to label when python_type description is empty", () => {
    const param = createParameter({
      label: "Prompt",
      python_type: {
        type: "str",
        description: "",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "string",
      description: "Prompt",
    });
  });

  it("includes default value when specified", () => {
    const param = createParameter({
      parameter_has_default: true,
      parameter_default: "default text",
      python_type: {
        type: "str",
        description: "",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "string",
      description: "Test Parameter",
      default: "default text",
    });
  });

  it("includes example when specified", () => {
    const param = createParameter({
      example_input: "example text",
      python_type: {
        type: "str",
        description: ""
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "string",
      description: "Test Parameter",
      examples: ["example text"],
    });
  });

  it("includes both default and example when specified", () => {
    const param = createParameter({
      parameter_has_default: true,
      parameter_default: "default text",
      example_input: "example text",
      python_type: {
        type: "str",
        description:"",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "string",
      description: "Test Parameter",
      default: "default text",
      examples: ["example text"],
    });
  });
});

describe("convertParameter", () => {
  it("converts a single parameter correctly", () => {
    const param: ApiParameter = {
      label: "Input Text",
      parameter_name: "text",
      parameter_has_default: false,
      parameter_default: null,
      type: "string",
      python_type: {
        type: "str",
        description: "A text input",
      },
      component: "Textbox",
    };

    const result = convertParameter(param);

    // TypeScript ensures result matches ParameterSchema
    expect(result).toEqual({
      type: "string",
      description: "A text input",
    });
  });
});

describe("number type conversions", () => {
  // ...existing tests...

  it("handles basic number without constraints", () => {
    const param = createParameter({
      type: "number",
      python_type: {
        type: "float",
        description: "A number parameter",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "number",
      description: "A number parameter",
    });
  });

  it("parses minimum constraint", () => {
    const param = createParameter({
      type: "number",
      python_type: {
        type: "float",
        description: "A number parameter (min: 0)",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "number",
      description: "A number parameter (min: 0)",
      minimum: 0,
    });
  });

  it("parses maximum constraint", () => {
    const param = createParameter({
      type: "number",
      python_type: {
        type: "float",
        description: "A number parameter (maximum=100)",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "number",
      description: "A number parameter (maximum=100)",
      maximum: 100,
    });
  });

  it("parses both min and max constraints", () => {
    const param = createParameter({
      type: "number",
      python_type: {
        type: "float",
        description: "A number parameter (min: 0, max: 1.0)",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "number",
      description: "A number parameter (min: 0, max: 1.0)",
      minimum: 0,
      maximum: 1.0,
    });
  });

  it("parses 'between X and Y' format", () => {
    const param = createParameter({
      type: "number",
      python_type: {
        type: "float",
        description: "numeric value between 256 and 2048",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "number",
      description: "numeric value between 256 and 2048",
      minimum: 256,
      maximum: 2048,
    });
  });

  it("parses large number ranges", () => {
    const param = createParameter({
      type: "number",
      python_type: {
        type: "float",
        description: "numeric value between 0 and 2147483647",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "number",
      description: "numeric value between 0 and 2147483647",
      minimum: 0,
      maximum: 2147483647,
    });
  });
});

describe("boolean type conversions", () => {
  it("handles basic boolean parameter", () => {
    const param = createParameter({
      type: "boolean",
      python_type: {
        type: "bool",
        description: "A boolean flag",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "boolean",
      description: "A boolean flag",
    });
  });

  it("handles boolean with default value", () => {
    const param = createParameter({
      type: "boolean",
      parameter_has_default: true,
      parameter_default: true,
      python_type: {
        type: "bool",
        description: "",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "boolean",
      description: "Test Parameter",
      default: true,
    });
  });

  it("handles boolean with example", () => {
    const param = createParameter({
      type: "boolean",
      example_input: true,
      python_type: {
        type: "bool",
        description: "",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "boolean",
      description: "Test Parameter",
      examples: [true],
    });
  });

  it("matches the Randomize seed example exactly", () => {
    const param = createParameter({
      label: "Randomize seed",
      parameter_name: "randomize_seed",
      parameter_has_default: true,
      parameter_default: true,
      type: "boolean",
      example_input: true,
      python_type: {
        type: "bool",
        description: "",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "boolean",
      description: "Randomize seed",
      default: true,
      examples: [true],
    });
  });
});

describe("literal type conversions", () => {
  it("handles Literal type with enum values", () => {
    const param = createParameter({
      label: "Aspect Ratio",
      parameter_name: "aspect_ratio",
      parameter_has_default: true,
      parameter_default: "1:1",
      type: "string",
      python_type: {
        type: "Literal['1:1', '16:9', '9:16', '4:3']",
        description: "",
      },
      example_input: "1:1",
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "string",
      description: "Aspect Ratio",
      default: "1:1",
      examples: ["1:1"],
      enum: ["1:1", "16:9", "9:16", "4:3"]
    });
  });

  it("handles boolean-like Literal type with True/False strings", () => {
    const param = createParameter({
      label: "Is Example Image",
      parameter_name: "is_example_image",
      parameter_has_default: true,
      parameter_default: "False",
      type: "string",
      python_type: {
        type: "Literal['True', 'False']",
        description: "",
      },
      example_input: "True",
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "string",
      description: "Is Example Image",
      default: "False",
      examples: ["True"],
      enum: ["True", "False"]
    });
  });
});

describe("file and blob type conversions", () => {
  it("handles simple filepath type", () => {
    const exampleUrl = "https://example.com/image.png";
    const param = createParameter({
      type: "Blob | File | Buffer",
      python_type: {
        type: "filepath",
        description: "",
      },
      example_input: {
        path: exampleUrl,
        meta: { _type: "gradio.FileData" },
        orig_name: "image.png",
        url: exampleUrl,
      },
    });
    const result = convertParameter(param);

    expect(result).toMatchObject({
      type: "string",
      description: "Accepts: URL, file path, file name, or resource identifier",
    });
  });

  it("handles complex Dict type for image input", () => {
    const exampleUrl = "https://example.com/image.png";
    const param = createParameter({
      type: "Blob | File | Buffer",
      python_type: {
        type: "Dict(path: str | None (Path to a local file), url: str | None (Publicly available url), ...)",
        description: "For input, either path or url must be provided.",
      },
      example_input: {
        path: exampleUrl,
        meta: { _type: "gradio.FileData" },
        orig_name: "image.png",
        url: exampleUrl,
      },
    });
    const result = convertParameter(param);
    
    expect(result).toMatchObject({
      type: "string",
      description: "Accepts: URL, file path, file name, or resource identifier",
    });
  });

  it("handles audio file input type", () => {
    const exampleUrl = "https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav";
    const param = createParameter({
      type: "",
      python_type: {
        type: "filepath",
        description: "",
      },
      component: "Audio",
      example_input: {
        path: exampleUrl,
        meta: { _type: "gradio.FileData" },
        orig_name: "audio_sample.wav",
        url: exampleUrl,
      },
    });
    const result = convertParameter(param);
    
    expect(result).toMatchObject({
      type: "string",
      description: "Accepts: Audio file URL, file path, file name, or resource identifier",
    });
  });

  it("handles empty type string for audio input", () => {
    const param = createParameter({
      label: "parameter_1",
      parameter_name: "inputs",
      parameter_has_default: false,
      parameter_default: null,
      python_type: {
        type: "filepath",
        description: "",
      },
      component: "Audio",
      example_input: {
        path: "https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav",
        meta: { _type: "gradio.FileData" },
        orig_name: "audio_sample.wav",
        url: "https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav",
      },
    });
    const result = convertParameter(param);

    expect(result).toMatchObject({
      type: "string",  // Should always be "string" for file inputs
      description: "Accepts: Audio file URL, file path, file name, or resource identifier",
    });
  });

  it("handles image file input type", () => {
    const param = createParameter({
      type: "",
      python_type: {
        type: "filepath",
        description: "",
      },
      component: "Image",
      example_input: {
        path: "https://example.com/image.png",
        meta: { _type: "gradio.FileData" },
        orig_name: "image.png",
        url: "https://example.com/image.png",
      },
    });
    const result = convertParameter(param);

    expect(result).toMatchObject({
      type: "string",
      description: "Accepts: Image file URL, file path, file name, or resource identifier",
    });
  });
});

describe("unnamed parameters", () => {
  it("handles parameters without explicit names", () => {
    const param = createParameter({
      label: "Input Text",
      type: "string",
      python_type: {
        type: "str",
        description: "A text input",
      },
      component: "Textbox",
    });
    
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "string",
      description: "A text input",
    });
  });

  it("handles array of unnamed parameters", () => {
    const params = [
      createParameter({
        label: "Image Input",
        type: "Blob | File | Buffer",
        python_type: {
          type: "filepath",
          description: "",
        },
        component: "Image",
        example_input: "https://example.com/image.png",
      }),
      createParameter({
        label: "Text Input",
        type: "string", 
        python_type: {
          type: "str",
          description: "",
        },
        component: "Textbox",
        example_input: "Hello!",
      }),
    ];

    // Test each parameter conversion
    params.forEach((param, index) => {
      const result = convertParameter(param);
      expect(result).toBeTruthy();
    });
  });
});

describe("special cases", () => {
  // chatbox historys often have incorrect types/example pairings.
  // will later handle python dicts/tuples more elegantly.
  it("handles chat history parameter", () => {
    const param = createParameter({
      label: "Qwen2.5-72B-Instruct",
      parameter_name: "history",
      component: "Chatbot",
      python_type: {
        type: "list",
        description: "Some other description that should be ignored",
      },
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "array", 
      description: "Chat history as an array of message pairs. Each pair is [user_message, assistant_message] where messages can be text strings or null. Advanced: messages can also be file references or UI components."
    });
  });

  it("handles chat history parameter with examples", () => {
    const param = createParameter({
      label: "Qwen2.5-72B-Instruct",
      parameter_name: "history",
      component: "Chatbot",
      python_type: {
        type: "list",
        description: "Some other description that should be ignored",
      },
      example_input: [["Hello", "Hi there!"]],  // Example chat history
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "array", 
      description: "Chat history as an array of message pairs. Each pair is [user_message, assistant_message] where messages can be text strings or null. Advanced: messages can also be file references or UI components.",
      examples: [[["Hello", "Hi there!"]]]
    });
  });

  it("handles chat history parameter with default value", () => {
    const param = createParameter({
      label: "Qwen2.5-72B-Instruct",
      parameter_name: "history",
      component: "Chatbot",
      parameter_has_default: true,
      parameter_default: [],
      python_type: {
        type: "list",
        description: "Some other description that should be ignored",
      }
    });
    const result = convertParameter(param);

    expect(result).toEqual({
      type: "array", 
      description: "Chat history as an array of message pairs. Each pair is [user_message, assistant_message] where messages can be text strings or null. Advanced: messages can also be file references or UI components.",
      default: []
    });
  });
});
