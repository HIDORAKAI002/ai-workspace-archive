# System Prompt: plist-xml

- Source: inline

## Summary

XML structure for Claude Code URL handler.

# Raw Prompt Text
<?xml version="${NUM}" encoding="UTF-${NUM}"?>
<!DOCTYPE plist PUBLIC "-${PATH} PLIST ${NUM}${PATH}" "${URL}
<plist version="${NUM}">
<dict>
  <key>CFBundleIdentifier<${PATH}>
  <string>com.anthropic.claude-code-url-handler<${PATH}>
  <key>CFBundleName<${PATH}>
  <string>Claude Code URL Handler<${PATH}>
  <key>CFBundleExecutable<${PATH}>
  <string>claude<${PATH}>
  <key>CFBundleVersion<${PATH}>
  <string>${NUM}<${PATH}>
  <key>CFBundlePackageType<${PATH}>
  <string>APPL<${PATH}>
  <key>LSBackgroundOnly<${PATH}>
  <true/>
  <key>CFBundleURLTypes<${PATH}>
  <array>
    <dict>
      <key>CFBundleURLName<${PATH}>
      <string>Claude Code Deep Link<${PATH}>
      <key>CFBundleURLSchemes<${PATH}>
      <array>
        <string>claude-cli<${PATH}>
      <${PATH}>
    <${PATH}>
  <${PATH}>
<${PATH}>
<${PATH}>
