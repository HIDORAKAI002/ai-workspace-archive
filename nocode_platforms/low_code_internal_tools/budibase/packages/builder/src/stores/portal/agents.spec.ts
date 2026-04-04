import { describe, it, expect, beforeEach, vi } from "vitest"
import { get } from "svelte/store"
import type { Agent, AgentFileUploadResponse } from "@budibase/types"
import { AgentsStore } from "./agents"
import { API } from "@/api"

vi.mock("@/api", () => {
  return {
    API: {
      fetchAgents: vi.fn(),
      uploadAgentFile: vi.fn(),
      deleteAgentFile: vi.fn(),
    },
  }
})

const fetchAgents = vi.mocked(API.fetchAgents)
const uploadAgentFile = vi.mocked(API.uploadAgentFile)
const deleteAgentFile = vi.mocked(API.deleteAgentFile)

describe("AgentsStore file operations", () => {
  let store: AgentsStore

  beforeEach(() => {
    vi.clearAllMocks()
    store = new AgentsStore()
  })

  it("refreshes agents after uploading a file", async () => {
    const agents: Agent[] = [
      {
        _id: "agent_1",
        _rev: "2-rev",
        name: "Support bot",
      } as Agent,
    ]
    const uploadResponse: AgentFileUploadResponse = {
      file: {
        _id: "kb_file_1",
      } as AgentFileUploadResponse["file"],
    }
    uploadAgentFile.mockResolvedValue(uploadResponse)
    fetchAgents.mockResolvedValue({ agents })

    await store.uploadAgentFile("agent_1", {} as File)

    expect(uploadAgentFile).toHaveBeenCalledWith("agent_1", expect.anything())
    expect(fetchAgents).toHaveBeenCalledTimes(1)
    expect(get(store.store).agents).toEqual(agents)
  })

  it("does not refresh agents after deleting a file", async () => {
    const agents: Agent[] = [
      {
        _id: "agent_1",
        _rev: "3-rev",
        name: "Support bot",
      } as Agent,
    ]

    fetchAgents.mockResolvedValue({ agents })

    await store.deleteAgentFile("agent_1", "file_1")

    expect(deleteAgentFile).toHaveBeenCalledWith("agent_1", "file_1")
    expect(fetchAgents).not.toHaveBeenCalled()
  })
})
