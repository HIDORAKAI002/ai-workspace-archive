
import { describe, it, expect, vi } from "vitest";
import { EndpointWrapper, endpointSpecified, parsePath } from "../src/endpoint_wrapper";
import type { ApiEndpoint } from "../src/gradio_api";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";

// Mock the Client class
const mockSubmit = vi.fn();
const MockClient = {
  submit: mockSubmit,
  connect: vi.fn().mockResolvedValue({
    submit: mockSubmit,
    view_api: vi.fn(),
  }),
};

// Helper to create test endpoint
function createTestEndpoint(parameters: any[]): ApiEndpoint {
  return {
    parameters,
    returns: [{
      label: "Output",
      type: "string",
      python_type: { type: "str", description: "Output text" },
      component: "Text"
    }],
    type: { generator: false, cancel: false }
  };
}

describe("EndpointWrapper parameter mapping", () => {
  it("maps named parameters correctly", async () => {
    const endpoint = createTestEndpoint([
      {
        label: "Text Input",
        parameter_name: "text_input",
        type: "string",
        python_type: { type: "str", description: "" },
        component: "Textbox"
      }
    ]);

    const wrapper = new EndpointWrapper(
      parsePath("test/space/predict"),
      endpoint,
      MockClient as any,
    );

    // Mock successful response
    mockSubmit.mockImplementation(async function* () {
      yield { type: "data", data: ["response"] };
    });

    await wrapper.call({
      method: "tools/call",
      params: {
        name: "test",
        arguments: {
          text_input: "hello"
        }
      }
    }, {} as Server);

    // Verify the parameters were mapped correctly
    expect(mockSubmit).toHaveBeenCalledWith("/predict", {
      text_input: "hello"
    });
  });

  it("maps unnamed parameters to their index", async () => {
    const endpoint = createTestEndpoint([
      {
        label: "parameter_0",
        type: "string",
        python_type: { type: "str", description: "" },
        component: "Textbox"
      },
      {
        label: "parameter_1", 
        type: "number",
        python_type: { type: "float", description: "" },
        component: "Number"
      }
    ]);

    const wrapper = new EndpointWrapper(
      parsePath("/test/space/predict"),
      endpoint,
      MockClient as any,
    );

    mockSubmit.mockImplementation(async function* () {
      yield { type: "data", data: ["response"] };
    });

    await wrapper.call({
      params: {
        name: "test",
        arguments: {
          "parameter_0": "hello",
          "parameter_1": 42
        }
      },
      method: "tools/call"
    }, {} as Server);

    // Verify parameters were mapped by position
    expect(mockSubmit).toHaveBeenCalledWith("/predict", {
      "parameter_0": "hello",
      "parameter_1": 42
    });
  });

  it("handles mix of named and unnamed parameters", async () => {
    const endpoint = createTestEndpoint([
      {
        label: "Text Input",
        parameter_name: "text_input",
        type: "string",
        python_type: { type: "str", description: "" },
        component: "Textbox"
      },
      {
        label: "parameter_1",
        type: "number", 
        python_type: { type: "float", description: "" },
        component: "Number"
      }
    ]);

    const wrapper = new EndpointWrapper(
      parsePath("test/space/predict"),
      endpoint,
      MockClient as any,
    );

    mockSubmit.mockImplementation(async function* () {
      yield { type: "data", data: ["response"] };
    });

    await wrapper.call({
      params: {
        name: "test",
        arguments: {
          text_input: "hello",
          "parameter_1": 42
        }
      },
      method: "tools/call"
    }, {} as Server);

    // Verify mixed parameter mapping
    expect(mockSubmit).toHaveBeenCalledWith("/predict", {
      text_input: "hello",
      "parameter_1": 42
    });
  });
});

describe("specific endpoint detection works",()=>{
  it("detects no endpoint specified"),()=>{
    expect(endpointSpecified("/owner/space")).toBe(false);
  }
  it("detects endpoints specified"),()=>{
    expect(endpointSpecified("/owner/space/foo")).toBe(true);
    expect(endpointSpecified("/owner/space/3")).toBe(true);;
    expect(endpointSpecified("owner/space/3")).toBe(true);;
  }
})


describe("endpoint and tool naming works",() => {
  it("handles named endpoints", () => {
    const endpoint = parsePath("/prithivMLmods/Mistral-7B-Instruct-v0.3/model_chat");
    if(null==endpoint) throw new Error("endpoint is null");
    expect(endpoint.owner).toBe("prithivMLmods");
    expect(endpoint.space).toBe("Mistral-7B-Instruct-v0.3");
    expect(endpoint.endpoint).toBe("/model_chat");
    expect(endpoint.mcpToolName).toBe("Mistral-7B-Instruct-v0_3-model_chat");
    expect(endpoint.mcpDisplayName).toBe("Mistral-7B-Instruct-v0.3 endpoint /model_chat");
  });
  it("handles numbered endpoint"),() => {
    const endpoint = parsePath("/suno/bark/3");
    if(null==endpoint) throw new Error("endpoint is null");
    expect(endpoint.owner).toBe("suno");
    expect(endpoint.space).toBe("bark");
    expect(endpoint.endpoint).toBe(3);
    expect(endpoint.mcpToolName).toBe("bark-3");
    expect(endpoint.mcpDisplayName).toBe("bark endpoint /3");
  }
})