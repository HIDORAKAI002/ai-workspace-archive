# System Prompt: copy-image-to-clipboard

- Source: inline

## Summary

Load an image from a file path and copy it to Windows clipboard.

# Raw Prompt Text
Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Clipboard]::SetImage([System.Drawing.Image]::FromFile('${EXPR_1}
