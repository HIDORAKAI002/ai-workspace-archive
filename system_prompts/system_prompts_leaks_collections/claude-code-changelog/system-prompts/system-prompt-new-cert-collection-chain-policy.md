# System Prompt: new-cert-collection-chain-policy

- Source: inline

## Summary

Creates a new certificate collection and chain policy.

# Raw Prompt Text
$ErrorActionPreference = 'Stop'
        $certCollection = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2Collection
        $certCollection.Import('${EXPR_1}')

        if ($certCollection.Count -eq ${NUM}) {
          Write-Error 'No certificates found'
          exit ${NUM}
        }

        $leafCert = $certCollection[${NUM}]
        $chain = New-Object System.Security.Cryptography.X509Certificates.X509Chain

        # Enable revocation checking
        $chain.ChainPolicy.RevocationMode = 'Online'
        $chain.ChainPolicy.RevocationFlag = 'EntireChain'
        $chain.ChainPolicy.UrlRetrievalTimeout = New-TimeSpan -Seconds ${NUM}

        # Add code signing application policy
        $codeSignOid = New-Object System.Security.Cryptography.Oid '${NUM}.${NUM}.${NUM}.${NUM}.${NUM}'
        $chain.ChainPolicy.ApplicationPolicy.Add($codeSignOid)

        # Add intermediate certificates to extra store
        for ($i = ${NUM}; $i -lt $certCollection.Count; $i++) {
          [void]$chain.ChainPolicy.ExtraStore.Add($certCollection[$i])
        }

        # Build and validate chain
        $result = $chain.Build($leafCert)

        if ($result) {
          'Valid'
        } else {
          $chain.ChainStatus | ForEach-Object {
            Write-Error "$($_.Status): $($_.StatusInformation)"
          }
          exit ${NUM}
        }
