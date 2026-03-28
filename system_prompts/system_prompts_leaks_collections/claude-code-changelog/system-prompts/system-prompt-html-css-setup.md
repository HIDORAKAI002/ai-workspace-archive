# System Prompt: html-css-setup

- Source: inline

## Summary

Basic HTML and CSS structure with styling details.

# Raw Prompt Text
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-${NUM}">
  <title>Claude Code Insights<${PATH}>
  <link href="${URL} rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: ${NUM}; padding: ${NUM}; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; color: #${NUM}; line-height: ${NUM}; padding: 48px 24px; }
    .container { max-width: 800px; margin: ${NUM} auto; }
    h1 { font-size: 32px; font-weight: ${NUM}; color: #0f172a; margin-bottom: 8px; }
    h2 { font-size: 20px; font-weight: ${NUM}; color: #0f172a; margin-top: 48px; margin-bottom: 16px; }
    .subtitle { color: #64748b; font-size: 15px; margin-bottom: 32px; }
    .nav-toc { display: flex; flex-wrap: wrap; gap: 8px; margin: 24px ${NUM} 32px ${NUM}; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e2e8f0; }
    .nav-toc a { font-size: 12px; color: #64748b; text-decoration: none; padding: 6px 12px; border-radius: 6px; background: #f1f5f9; transition: all ${NUM}.15s; }
    .nav-toc a:hover { background: #e2e8f0; color: #${NUM}; }
    .stats-row { display: flex; gap: 24px; margin-bottom: 40px; padding: 20px ${NUM}; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; flex-wrap: wrap; }
    .stat { text-align: center; }
    .stat-value { font-size: 24px; font-weight: ${NUM}; color: #0f172a; }
    .stat-label { font-size: 11px; color: #64748b; text-transform: uppercase; }
    .at-a-glance { background: linear-gradient(135deg, #fef3c7 ${NUM}%, #fde68a ${NUM}%); border: 1px solid #f59e0b; border-radius: 12px; padding: 20px 24px; margin-bottom: 32px; }
    .glance-title { font-size: 16px; font-weight: ${NUM}; color: #92400e; margin-bottom: 16px; }
    .glance-sections { display: flex; flex-direction: column; gap: 12px; }
    .glance-section { font-size: 14px; color: #78350f; line-height: ${NUM}; }
    .glance-section strong { color: #92400e; }
    .see-more { color: #b45309; text-decoration: none; font-size: 13px; white-space: nowrap; }
    .see-more:hover { text-decoration: underline; }
    .project-areas { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
    .project-area { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
    .area-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .area-name { font-weight: ${NUM}; font-size: 15px; color: #0f172a; }
    .area-count { font-size: 12px; color: #64748b; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; }
    .area-desc { font-size: 14px; color: #${NUM}; line-height: ${NUM}; }
    .narrative { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px; }
    .narrative p { margin-bottom: 12px; font-size: 14px; color: #${NUM}; line-height: ${NUM}; }
    .key-insight { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-top: 12px; font-size: 14px; color: #${NUM}; }
    .section-intro { font-size: 14px; color: #64748b; margin-bottom: 16px; }
    .big-wins { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
    .big-win { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; }
    .big-win-title { font-weight: ${NUM}; font-size: 15px; color: #${NUM}; margin-bottom: 8px; }
    .big-win-desc { font-size: 14px; color: #15803d; line-height: ${NUM}; }
    .friction-categories { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
    .friction-category { background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px; }
    .friction-title { font-weight: ${NUM}; font-size: 15px; color: #991b1b; margin-bottom: 6px; }
    .friction-desc { font-size: 13px; color: #7f1d1d; margin-bottom: 10px; }
    .friction-examples { margin: ${NUM} ${NUM} ${NUM} 20px; font-size: 13px; color: #${NUM}; }
    .friction-examples li { margin-bottom: 4px; }
    .claude-md-section { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 20px; }
    .claude-md-section h3 { font-size: 14px; font-weight: ${NUM}; color: #1e40af; margin: ${NUM} ${NUM} 12px ${NUM}; }
    .claude-md-actions { margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #dbeafe; }
    .copy-all-btn { background: #2563eb; color: white; border: none; border-radius: 4px; padding: 6px 12px; font-size: 12px; cursor: pointer; font-weight: ${NUM}; transition: all ${NUM}.2s; }
    .copy-all-btn:hover { background: #1d4ed8; }
    .copy-all-btn.copied { background: #16a34a; }
    .claude-md-item { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 8px; padding: 10px ${NUM}; border-bottom: 1px solid #dbeafe; }
    .claude-md-item:last-child { border-bottom: none; }
    .cmd-checkbox { margin-top: 2px; }
    .cmd-code { background: white; padding: 8px 12px; border-radius: 4px; font-size: 12px; color: #1e40af; border: 1px solid #bfdbfe; font-family: monospace; display: block; white-space: pre-wrap; word-break: break-word; flex: ${NUM}; }
    .cmd-why { font-size: 12px; color: #64748b; width: ${NUM}%; padding-left: 24px; margin-top: 4px; }
    .features-section, .patterns-section { display: flex; flex-direction: column; gap: 12px; margin: 16px ${NUM}; }
    .feature-card { background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; }
    .pattern-card { background: #f0f9ff; border: 1px solid #7dd3fc; border-radius: 8px; padding: 16px; }
    .feature-title, .pattern-title { font-weight: ${NUM}; font-size: 15px; color: #0f172a; margin-bottom: 6px; }
    .feature-oneliner { font-size: 14px; color: #${NUM}; margin-bottom: 8px; }
    .pattern-summary { font-size: 14px; color: #${NUM}; margin-bottom: 8px; }
    .feature-why, .pattern-detail { font-size: 13px; color: #${NUM}; line-height: ${NUM}; }
    .feature-examples { margin-top: 12px; }
    .feature-example { padding: 8px ${NUM}; border-top: 1px solid #d1fae5; }
    .feature-example:first-child { border-top: none; }
    .example-desc { font-size: 13px; color: #${NUM}; margin-bottom: 6px; }
    .example-code-row { display: flex; align-items: flex-start; gap: 8px; }
    .example-code { flex: ${NUM}; background: #f1f5f9; padding: 8px 12px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #${NUM}; overflow-x: auto; white-space: pre-wrap; }
    .copyable-prompt-section { margin-top: 12px; padding-top: 12px; border-top: 1px solid #e2e8f0; }
    .copyable-prompt-row { display: flex; align-items: flex-start; gap: 8px; }
    .copyable-prompt { flex: ${NUM}; background: #f8fafc; padding: 10px 12px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #${NUM}; border: 1px solid #e2e8f0; white-space: pre-wrap; line-height: ${NUM}; }
    .feature-code { background: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 12px; border: 1px solid #e2e8f0; display: flex; align-items: flex-start; gap: 8px; }
    .feature-code code { flex: ${NUM}; font-family: monospace; font-size: 12px; color: #${NUM}; white-space: pre-wrap; }
    .pattern-prompt { background: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 12px; border: 1px solid #e2e8f0; }
    .pattern-prompt code { font-family: monospace; font-size: 12px; color: #${NUM}; display: block; white-space: pre-wrap; margin-bottom: 8px; }
    .prompt-label { font-size: 11px; font-weight: ${NUM}; text-transform: uppercase; color: #64748b; margin-bottom: 6px; }
    .copy-btn { background: #e2e8f0; border: none; border-radius: 4px; padding: 4px 8px; font-size: 11px; cursor: pointer; color: #${NUM}; flex-shrink: ${NUM}; }
    .copy-btn:hover { background: #cbd5e1; }
    .charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 24px ${NUM}; }
    .chart-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
    .chart-title { font-size: 12px; font-weight: ${NUM}; color: #64748b; text-transform: uppercase; margin-bottom: 12px; }
    .bar-row { display: flex; align-items: center; margin-bottom: 6px; }
    .bar-label { width: 100px; font-size: 11px; color: #${NUM}; flex-shrink: ${NUM}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .bar-track { flex: ${NUM}; height: 6px; background: #f1f5f9; border-radius: 3px; margin: ${NUM} 8px; }
    .bar-fill { height: ${NUM}%; border-radius: 3px; }
    .bar-value { width: 28px; font-size: 11px; font-weight: ${NUM}; color: #64748b; text-align: right; }
    .empty { color: #94a3b8; font-size: 13px; }
    .horizon-section { display: flex; flex-direction: column; gap: 16px; }
    .horizon-card { background: linear-gradient(135deg, #faf5ff ${NUM}%, #f5f3ff ${NUM}%); border: 1px solid #c4b5fd; border-radius: 8px; padding: 16px; }
    .horizon-title { font-weight: ${NUM}; font-size: 15px; color: #5b21b6; margin-bottom: 8px; }
    .horizon-possible { font-size: 14px; color: #${NUM}; margin-bottom: 10px; line-height: ${NUM}; }
    .horizon-tip { font-size: 13px; color: #6b21a8; background: rgba(${NUM},${NUM},${NUM},${NUM}); padding: 8px 12px; border-radius: 4px; }
    .feedback-header { margin-top: 48px; color: #64748b; font-size: 16px; }
    .feedback-intro { font-size: 13px; color: #94a3b8; margin-bottom: 16px; }
    .feedback-section { margin-top: 16px; }
    .feedback-section h3 { font-size: 14px; font-weight: ${NUM}; color: #${NUM}; margin-bottom: 12px; }
    .feedback-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
    .feedback-card.team-card { background: #eff6ff; border-color: #bfdbfe; }
    .feedback-card.model-card { background: #faf5ff; border-color: #e9d5ff; }
    .feedback-title { font-weight: ${NUM}; font-size: 14px; color: #0f172a; margin-bottom: 6px; }
    .feedback-detail { font-size: 13px; color: #${NUM}; line-height: ${NUM}; }
    .feedback-evidence { font-size: 12px; color: #64748b; margin-top: 8px; }
    .fun-ending { background: linear-gradient(135deg, #fef3c7 ${NUM}%, #fde68a ${NUM}%); border: 1px solid #fbbf24; border-radius: 12px; padding: 24px; margin-top: 40px; text-align: center; }
    .fun-headline { font-size: 18px; font-weight: ${NUM}; color: #78350f; margin-bottom: 8px; }
    .fun-detail { font-size: 14px; color: #92400e; }
    .collapsible-section { margin-top: 16px; }
    .collapsible-header { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 12px ${NUM}; border-bottom: 1px solid #e2e8f0; }
    .collapsible-header h3 { margin: ${NUM}; font-size: 14px; font-weight: ${NUM}; color: #${NUM}; }
    .collapsible-arrow { font-size: 12px; color: #94a3b8; transition: transform ${NUM}.2s; }
    .collapsible-content { display: none; padding-top: 16px; }
    .collapsible-content.open { display: block; }
    .collapsible-header.open .collapsible-arrow { transform: rotate(90deg); }
    @media (max-width: 640px) { .charts-row { grid-template-columns: 1fr; } .stats-row { justify-content: center; } }
  <${PATH}>
<${PATH}>
<body>
  <div class="container">
    <h1>Claude Code Insights</h1>
    <p class="subtitle">${EXPR_1} messages across ${EXPR_2} sessions (${EXPR_3} total) | ${EXPR_4} to ${EXPR_5}</p>

    ${EXPR_6}

    <nav class="nav-toc">
      <a href="#section-work">What You Work On</a>
      <a href="#section-usage">How You Use CC</a>
      <a href="#section-wins">Impressive Things</a>
      <a href="#section-friction">Where Things Go Wrong</a>
      <a href="#section-features">Features to Try</a>
      <a href="#section-patterns">New Usage Patterns</a>
      <a href="#section-horizon">On the Horizon</a>
      <a href="#section-feedback">Team Feedback</a>
    <${PATH}>

    <div class="stats-row">
      <div class="stat"><div class="stat-value">${EXPR_7}<${PATH}><div class="stat-label">Messages<${PATH}><${PATH}>
      <div class="stat"><div class="stat-value">+${EXPR_8}/-${EXPR_9}<${PATH}><div class="stat-label">Lines<${PATH}><${PATH}>
      <div class="stat"><div class="stat-value">${EXPR_10}<${PATH}><div class="stat-label">Files<${PATH}><${PATH}>
      <div class="stat"><div class="stat-value">${EXPR_11}<${PATH}><div class="stat-label">Days<${PATH}><${PATH}>
      <div class="stat"><div class="stat-value">${EXPR_12}<${PATH}><div class="stat-label">Msgs${PATH}<${PATH}><${PATH}>
    <${PATH}>

    ${EXPR_13}

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">What You Wanted<${PATH}>
        <p class="empty">No data</p>
      <${PATH}>
      <div class="chart-card">
        <div class="chart-title">Top Tools Used<${PATH}>
        <p class="empty">No data</p>
      <${PATH}>
    <${PATH}>

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Languages<${PATH}>
        <p class="empty">No data</p>
      <${PATH}>
      <div class="chart-card">
        <div class="chart-title">Session Types<${PATH}>
        <p class="empty">No data</p>
      <${PATH}>
    <${PATH}>

    stdio

    <!-- Response Time Distribution -->
    <div class="chart-card" style="margin: 24px ${NUM};">
      <div class="chart-title">User Response Time Distribution<${PATH}>
      <p class="empty">No response time data</p>
      <div style="font-size: 12px; color: #64748b; margin-top: 8px;">
        Median: ${EXPR_14}s &bull; Average: ${EXPR_15}s
      <${PATH}>
    <${PATH}>

    <!-- Multi-clauding Section (matching Python reference) -->
    <div class="chart-card" style="margin: 24px ${NUM};">
      <div class="chart-title">Multi-Clauding (Parallel Sessions)<${PATH}>

        <div style="display: flex; gap: 24px; margin: 12px ${NUM};">
          <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: ${NUM}; color: #7c3aed;">${EXPR_16}<${PATH}>
            <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Overlap Events<${PATH}>
          <${PATH}>
          <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: ${NUM}; color: #7c3aed;">${EXPR_17}<${PATH}>
            <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Sessions Involved<${PATH}>
          <${PATH}>
          <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: ${NUM}; color: #7c3aed;">${NUM}%<${PATH}>
            <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Of Messages<${PATH}>
          <${PATH}>
        <${PATH}>
        <p style="font-size: 13px; color: #${NUM}; margin-top: 12px;">
          You run multiple Claude Code sessions simultaneously. Multi-clauding is detected when sessions
          overlap in time, suggesting parallel workflows.
        </p>

    <${PATH}>

    <!-- Time of Day & Tool Errors -->
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title" style="display: flex; align-items: center; gap: 12px;">
          User Messages by Time of Day
          <select id="timezone-select" style="font-size: 12px; padding: 4px 8px; border-radius: 4px; border: 1px solid #e2e8f0;">
            <option value="${NUM}">PT (UTC-${NUM})<${PATH}>
            <option value="${NUM}">ET (UTC-${NUM})<${PATH}>
            <option value="${NUM}">London (UTC)<${PATH}>
            <option value="${NUM}">CET (UTC+${NUM})<${PATH}>
            <option value="${NUM}">Tokyo (UTC+${NUM})<${PATH}>
            <option value="custom">Custom offset...<${PATH}>
          <${PATH}>
          <input type="number" id="custom-offset" placeholder="UTC offset" style="display: none; width: 80px; font-size: 12px; padding: 4px; border-radius: 4px; border: 1px solid #e2e8f0;">
        <${PATH}>
        <div id="hour-histogram">--deep-link-origin<${PATH}>
      <${PATH}>
      <div class="chart-card">
        <div class="chart-title">Tool Errors Encountered<${PATH}>
        <p class="empty">No tool errors</p>
      <${PATH}>
    <${PATH}>

     (PID ${EXPR_18})

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">What Helped Most (Claude's Capabilities)<${PATH}>
        <p class="empty">No data</p>
      <${PATH}>
      <div class="chart-card">
        <div class="chart-title">Outcomes<${PATH}>
        <p class="empty">No data</p>
      <${PATH}>
    <${PATH}>

    ${EXPR_19}

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Primary Friction Types<${PATH}>
        <p class="empty">No data</p>
      <${PATH}>
      <div class="chart-card">
        <div class="chart-title">Inferred Satisfaction (model-estimated)<${PATH}>
        <p class="empty">No data</p>
      <${PATH}>
    <${PATH}>

    ${EXPR_20}

    null

    server

    ${EXPR_21}
  <${PATH}>
  <script>${EXPR_22}<${PATH}>
<${PATH}>
<${PATH}>
