<script lang="ts">
  import { StatusLight } from "@budibase/bbui"
  import { KnowledgeBaseFileStatus } from "@budibase/types"

  export let row: {
    displayStatus: string
    status: KnowledgeBaseFileStatus
    isUploading?: boolean
  }

  const getStatusProps = (row: {
    status: KnowledgeBaseFileStatus
    isUploading?: boolean
  }) => {
    if (row.isUploading) {
      return { info: true }
    }

    const { status } = row
    switch (status) {
      case KnowledgeBaseFileStatus.READY:
        return { positive: true }
      case KnowledgeBaseFileStatus.FAILED:
        return { negative: true }
      default:
        return { notice: true }
    }
  }
</script>

<StatusLight size="S" {...getStatusProps(row)}>
  {row.displayStatus}
</StatusLight>
