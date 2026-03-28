# System Prompt: server-curl-retry-after-response

- Source: inline

## Summary

Verifying server changes with curl and response handling.

# Raw Prompt Text
# Verifying a server${PATH} change

The handle is `curl` (or equivalent). The evidence is the response.

## Pattern

${NUM}. Start the server (background, with a readiness poll — see below)
${NUM}. `curl` the route the diff touches, with inputs that hit the changed branch
${NUM}. Capture the full response (status + headers + body)
${NUM}. Compare to expected

## Lifecycle

If there's a run-skill it handles this. If not:

```bash
<start-command> &> ${PATH} &
SERVER_PID=$!
for i in {${NUM}..${NUM}}; do curl -sf localhost:PORT${PATH} >${PATH} && break; sleep ${NUM}; done
# ... your curls ...
kill $SERVER_PID
```

No readiness endpoint? Poll the route you're about to test until it
stops returning connection-refused, then add a beat.

## Worked example

**Diff:** adds a `Retry-After` header to ${NUM} responses in `rateLimit.ts`.
**Claim (PR body):** "clients can now back off correctly."

**Inference:** hitting the rate limit should now return `Retry-After: <n>`
in the response headers. It didn't before.

**Plan:**
${NUM}. Start server
${NUM}. Hit the rate-limited endpoint enough times to trigger ${NUM}
${NUM}. Check the ${NUM} response has `Retry-After` header
${NUM}. Check the value is a positive integer

**Execute:**
```bash
# trigger the limit — ${NUM} fast requests, limit is ${NUM}${PATH} per the diff
for i in {${NUM}..${NUM}}; do curl -s -o ${PATH} -w "%{http_code}\n" localhost:${NUM}${PATH}; done
# → ${NUM} ${NUM} ${NUM} ${NUM} ${NUM} ${NUM} ${NUM} ${NUM} ${NUM} ${NUM}

# capture the ${NUM} headers
curl -si localhost:${NUM}${PATH} | head -${NUM}
# → HTTP${PATH} ${NUM} Too Many Requests
# → Retry-After: ${NUM}
# → ...
```

**Verdict:** PASS — `Retry-After: ${NUM}` present, positive integer.

## What FAIL looks like

- Header absent → the diff didn't take effect, or you're not actually
  hitting the ${NUM} path (check the status code first)
- Header present but value is `NaN` / `undefined` / negative → the
  logic is wrong
- You got 200s all the way through → you never triggered the changed
  path. Tighten the request burst or check the rate limit config.
