# System Prompt: az-access-token-tenantid-params

- Source: inline

## Summary

Invoke PowerShell to get Az access token, optional tenant, secure-string conversion output JSON.

# Raw Prompt Text
${EXPR_1}

-NoProfile

-NonInteractive

-Command


          $tenantId = "${EXPR_2}"
          $m = Import-Module Az.Accounts -MinimumVersion ${NUM}.${NUM} -PassThru
          $useSecureString = $m.Version -ge [version]'${NUM}.${NUM}'

          $params = @{
            ResourceUrl = "${EXPR_3}"
          }

          if ($tenantId.Length -gt ${NUM}) {
            $params["TenantId"] = $tenantId
          }

          if ($useSecureString) {
            $params["AsSecureString"] = $true
          }

          $token = Get-AzAccessToken @params

          $result = New-Object -TypeName PSObject
          $result | Add-Member -MemberType NoteProperty -Name ExpiresOn -Value $token.ExpiresOn
          if ($useSecureString) {
            $result | Add-Member -MemberType NoteProperty -Name Token -Value (ConvertFrom-SecureString -AsPlainText $token.Token)
          } else {
            $result | Add-Member -MemberType NoteProperty -Name Token -Value $token.Token
          }

          Write-Output (ConvertTo-Json $result)
