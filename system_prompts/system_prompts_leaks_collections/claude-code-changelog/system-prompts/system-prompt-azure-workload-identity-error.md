# System Prompt: azure-workload-identity-error

- Source: inline

## Summary

Explains missing Azure workload identity parameters and required environment variables with a troubleshooting link.

# Raw Prompt Text
WorkloadIdentityCredential: is unavailable. tenantId, clientId, and federatedTokenFilePath are required parameters.
      In DefaultAzureCredential and ManagedIdentityCredential, these can be provided as environment variables -
      "AZURE_TENANT_ID",
      "AZURE_CLIENT_ID",
      "AZURE_FEDERATED_TOKEN_FILE". See the troubleshooting guide for more information: ${URL}
