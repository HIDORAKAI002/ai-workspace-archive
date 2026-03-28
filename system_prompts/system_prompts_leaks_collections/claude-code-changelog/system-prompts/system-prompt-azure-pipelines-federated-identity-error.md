# System Prompt: azure-pipelines-federated-identity-error

- Source: inline

## Summary

Reports missing parameters needed for Azure Pipelines federated identity auth.

# Raw Prompt Text
AzurePipelinesCredential: is unavailable. To use Federation Identity in Azure Pipelines, the following parameters are required -
      tenantId,
      clientId,
      serviceConnectionId,
      systemAccessToken,
      "SYSTEM_OIDCREQUESTURI".
      See the troubleshooting guide for more information: ${URL}
