<script lang="ts">
  import {
    Body,
    Button,
    Layout,
    ProgressCircle,
    notifications,
    Table,
  } from "@budibase/bbui"
  import { createPolling } from "@/utils/polling"
  import { confirm } from "@/helpers"
  import { helpers } from "@budibase/shared-core"
  import {
    KnowledgeBaseFileStatus,
    type Agent,
    type KnowledgeBaseFile,
  } from "@budibase/types"
  import { agentsStore, selectedAgent } from "@/stores/portal"
  import KnowledgeIconRenderer from "./renderers/KnowledgeIconRenderer.svelte"
  import KnowledgeNameRenderer from "./renderers/KnowledgeNameRenderer.svelte"
  import KnowledgeStatusRenderer from "./renderers/KnowledgeStatusRenderer.svelte"
  import KnowledgeDeleteRenderer from "./renderers/KnowledgeDeleteRenderer.svelte"
  import { onDestroy, onMount } from "svelte"

  const FILE_STATUS_POLL_MS = 1000
  const BYTES_IN_MB = 1024 * 1024
  const MAX_FILE_SIZE_BYTES = 100 * BYTES_IN_MB
  const MAX_FILE_SIZE_LABEL = "100MB"

  interface PendingUpload {
    tempId: string
    filename: string
    size?: number
    mimetype?: string
    createdAt: string
  }

  let currentAgent: Agent | undefined = $derived($selectedAgent)
  let activeAgentId = $derived(currentAgent?._id)
  let loading = $state(true)
  let files = $state<KnowledgeBaseFile[]>([])
  let pendingUploadsByAgent = $state<Record<string, PendingUpload[]>>({})
  let uploadingByAgent = $state<Record<string, boolean>>({})
  let uploadProgressByAgent = $state<Record<string, string>>({})
  let fileInput = $state<HTMLInputElement>()
  let loadedAgentId = $state<string | undefined>()

  let activePendingUploads = $derived(
    activeAgentId ? pendingUploadsByAgent[activeAgentId] || [] : []
  )
  let isUploadingActiveAgent = $derived(
    activeAgentId ? !!uploadingByAgent[activeAgentId] : false
  )
  let activeUploadProgress = $derived(
    activeAgentId ? uploadProgressByAgent[activeAgentId] || "" : ""
  )

  const readableStatus: Record<KnowledgeBaseFileStatus, string> = {
    [KnowledgeBaseFileStatus.PROCESSING]: "Processing",
    [KnowledgeBaseFileStatus.READY]: "Ready",
    [KnowledgeBaseFileStatus.FAILED]: "Failed",
  }

  const formatFileStatus = (file: KnowledgeBaseFile) =>
    readableStatus[file.status] || file.status

  const formatTimestamp = (value?: string | number) => {
    if (!value) {
      return "—"
    }
    try {
      return new Date(value).toLocaleString()
    } catch (error) {
      return value
    }
  }

  const fetchFiles = async (agentId: string) => {
    const { files: fetched } = await agentsStore.fetchAgentFiles(agentId)
    files = fetched
  }

  const shouldPoll = () =>
    files.some(file => file.status === KnowledgeBaseFileStatus.PROCESSING)

  const setPendingUploadsForAgent = (
    agentId: string,
    pendingUploads: PendingUpload[]
  ) => {
    pendingUploadsByAgent = {
      ...pendingUploadsByAgent,
      [agentId]: pendingUploads,
    }
  }

  const removePendingUpload = (agentId: string, tempId: string) => {
    const pendingUploads = pendingUploadsByAgent[agentId] || []
    setPendingUploadsForAgent(
      agentId,
      pendingUploads.filter(upload => upload.tempId !== tempId)
    )
  }

  const setUploadingForAgent = (agentId: string, uploading: boolean) => {
    uploadingByAgent = {
      ...uploadingByAgent,
      [agentId]: uploading,
    }
  }

  const setUploadProgressForAgent = (agentId: string, progress: string) => {
    uploadProgressByAgent = {
      ...uploadProgressByAgent,
      [agentId]: progress,
    }
  }

  const poller = createPolling({
    intervalMs: FILE_STATUS_POLL_MS,
    shouldPoll,
    poll: async () => {
      if (!currentAgent?._id) {
        return
      }
      await fetchFiles(currentAgent._id)
    },
  })

  let tableRows = $derived.by(() =>
    [
      ...activePendingUploads.map(upload => ({
        _id: upload.tempId,
        filename: upload.filename,
        status: KnowledgeBaseFileStatus.PROCESSING,
        displayStatus: "Uploading",
        isUploading: true,
        size: helpers.formatBytes(upload.size, " "),
        updatedAt: formatTimestamp(upload.createdAt),
        onDelete: undefined,
        errorMessage: undefined,
        mimetype: upload.mimetype,
      })),
      ...files.map(file => ({
        _id: file._id,
        filename: file.filename,
        status: file.status,
        displayStatus: formatFileStatus(file),
        isUploading: false,
        size: helpers.formatBytes(file.size, " "),
        updatedAt: formatTimestamp(
          file.processedAt || file.updatedAt || file.createdAt
        ),
        onDelete: () => removeFile(file),
        errorMessage: file.errorMessage,
        mimetype: file.mimetype,
      })),
    ].sort((a, b) => a.filename.localeCompare(b.filename))
  )

  const customRenderers = [
    { column: "icon", component: KnowledgeIconRenderer },
    { column: "filename", component: KnowledgeNameRenderer },
    { column: "displayStatus", component: KnowledgeStatusRenderer },
    { column: "delete", component: KnowledgeDeleteRenderer },
  ]

  const loadAgentFiles = async () => {
    const agentId = currentAgent?._id
    if (!agentId) {
      files = []
      loading = false
      loadedAgentId = undefined
      return
    }
    loading = true
    try {
      await fetchFiles(agentId)
      loadedAgentId = agentId
    } finally {
      loading = false
    }
  }

  $effect(() => {
    const agentId = currentAgent?._id
    if (!agentId || loadedAgentId !== agentId) {
      loadAgentFiles().catch(error => {
        console.error(error)
        notifications.error("Failed to load files")
      })
    }
  })

  $effect(() => {
    if (shouldPoll()) {
      poller.start()
    } else {
      poller.stop()
    }
  })

  onMount(async () => {
    try {
      if (!$agentsStore.agentsLoaded) {
        await agentsStore.init()
      }
      await loadAgentFiles()
    } catch (error) {
      console.error(error)
      notifications.error("Failed to load files")
    }
  })

  async function handleFileUpload(event: Event) {
    const uploadAgentId = currentAgent?._id
    if (!uploadAgentId) {
      return
    }
    const target = event.currentTarget as HTMLInputElement
    const selectedFiles = Array.from(target?.files || [])
    if (selectedFiles.length === 0) {
      return
    }

    const uploads = selectedFiles.map((file, index) => ({
      file,
      tempId: `pending-upload-${Date.now()}-${index}`,
      createdAt: new Date().toISOString(),
    }))

    setPendingUploadsForAgent(uploadAgentId, [
      ...uploads.map(upload => ({
        tempId: upload.tempId,
        filename: upload.file.name,
        size: upload.file.size,
        mimetype: upload.file.type || undefined,
        createdAt: upload.createdAt,
      })),
      ...(pendingUploadsByAgent[uploadAgentId] || []),
    ])

    setUploadingForAgent(uploadAgentId, true)
    setUploadProgressForAgent(uploadAgentId, "")
    let successfulUploads = 0
    const failedUploads: string[] = []
    const oversizedUploads: string[] = []

    try {
      for (const [index, upload] of uploads.entries()) {
        const file = upload.file
        setUploadProgressForAgent(
          uploadAgentId,
          `Uploading ${index + 1}/${uploads.length}...`
        )

        if (file.size > MAX_FILE_SIZE_BYTES) {
          oversizedUploads.push(file.name)
          removePendingUpload(uploadAgentId, upload.tempId)
          continue
        }

        try {
          const { file: uploadedFile } = await agentsStore.uploadAgentFile(
            uploadAgentId,
            file
          )
          if (currentAgent?._id === uploadAgentId) {
            files = [
              uploadedFile,
              ...files.filter(existing => existing._id !== uploadedFile._id),
            ]
          }
          successfulUploads += 1
        } catch (error) {
          console.error(error)
          failedUploads.push(file.name)
        } finally {
          removePendingUpload(uploadAgentId, upload.tempId)
        }
      }

      if (currentAgent?._id === uploadAgentId) {
        await fetchFiles(uploadAgentId)
      }

      if (failedUploads.length === 0 && oversizedUploads.length === 0) {
        notifications.success(
          successfulUploads === 1
            ? "File uploaded"
            : `Uploaded ${successfulUploads} files`
        )
        return
      }

      if (successfulUploads > 0) {
        notifications.info(
          `Uploaded ${successfulUploads}/${uploads.length} files`
        )
      }

      const issueMessages: string[] = []
      if (failedUploads.length > 0) {
        issueMessages.push(
          failedUploads.length === 1
            ? "1 file failed"
            : `${failedUploads.length} files failed`
        )
      }
      if (oversizedUploads.length > 0) {
        issueMessages.push(
          oversizedUploads.length === 1
            ? `1 file exceeded ${MAX_FILE_SIZE_LABEL}`
            : `${oversizedUploads.length} files exceeded ${MAX_FILE_SIZE_LABEL}`
        )
      }

      notifications.error(
        issueMessages.length > 0
          ? `Some files were not uploaded: ${issueMessages.join(", ")}.`
          : "Failed to upload files"
      )
    } finally {
      setUploadingForAgent(uploadAgentId, false)
      setUploadProgressForAgent(uploadAgentId, "")
      if (target) {
        target.value = ""
      }
    }
  }

  function handleUploadClick() {
    if (isUploadingActiveAgent) {
      return
    }
    fileInput?.click()
  }

  async function removeFile(file: KnowledgeBaseFile) {
    const agentId = currentAgent?._id
    const fileId = file._id
    if (!agentId || !fileId) {
      return
    }

    await confirm({
      title: "Confirm deletion",
      body: `Are you sure you want to remove ${file.filename}? This action can't be undone.`,
      okText: "Delete",
      onConfirm: async () => {
        try {
          await agentsStore.deleteAgentFile(agentId, fileId)
          await fetchFiles(agentId)
          notifications.success("File removed")
        } catch (error) {
          console.error(error)
          notifications.error("Failed to remove file")
        }
      },
    })
  }

  onDestroy(() => {
    poller.stop()
  })
</script>

<Layout gap="S" noPadding>
  <Body size="M">Give your agent knowledge</Body>
  <div class="knowledge-header">
    <Body size="S">Knowledge bases</Body>

    <Button
      icon="plus"
      size="S"
      secondary
      disabled={isUploadingActiveAgent}
      on:click={handleUploadClick}
      >{isUploadingActiveAgent
        ? activeUploadProgress || "Uploading..."
        : "Add knowledge"}</Button
    >

    <input
      type="file"
      accept=".txt,.md,.markdown,.json,.yaml,.yml,.csv,.tsv,.pdf"
      multiple
      hidden
      bind:this={fileInput}
      onchange={handleFileUpload}
    />
  </div>

  <div class="file-limit-note">
    <Body size="S">Max file size: {MAX_FILE_SIZE_LABEL} per file.</Body>
  </div>

  {#if loading}
    <div class="loading-state">
      <ProgressCircle size="S" />
      <Body size="S">Loading files...</Body>
    </div>
  {:else if tableRows.length === 0}
    <div class="empty-state">
      <Body size="S">No files uploaded yet</Body>
    </div>
  {:else}
    <Table
      compact
      quiet
      rounded
      hideHeader
      allowClickRows={false}
      allowEditRows={false}
      allowEditColumns={false}
      data={tableRows}
      schema={{
        icon: { width: "36px" },
        filename: { displayName: "Name", width: "minmax(0, 2fr)" },
        displayStatus: { displayName: "Status", width: "130px" },
        delete: { displayName: "", width: "48px", align: "Right" },
      }}
      {customRenderers}
    />
  {/if}
</Layout>

<style>
  .knowledge-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-m);
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-s);
    padding: 24px 0;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-s);
    padding: 24px 16px;
    text-align: center;
  }

  .file-limit-note {
    color: var(--spectrum-global-color-gray-700);
  }
</style>
