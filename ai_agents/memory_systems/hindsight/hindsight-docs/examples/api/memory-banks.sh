#!/bin/bash
# Memory Banks API examples for Hindsight CLI
# Run: bash examples/api/memory-banks.sh

set -e

HINDSIGHT_URL="${HINDSIGHT_API_URL:-http://localhost:8888}"

# =============================================================================
# Doc Examples
# =============================================================================

# [docs:create-bank]
hindsight bank create my-bank
# [/docs:create-bank]

# [docs:bank-with-disposition]
hindsight bank create architect-bank \
  --mission "You're a senior software architect - keep track of system designs, technology decisions, and architectural patterns. Prefer simplicity over cutting-edge." \
  --skepticism 4 \
  --literalism 4 \
  --empathy 2
# [/docs:bank-with-disposition]

# [docs:bank-background]
hindsight bank create my-bank \
  --mission "I am a research assistant specializing in machine learning."
# [/docs:bank-background]

# [docs:bank-mission]
hindsight bank create my-bank \
  --mission "You're a senior software architect - keep track of system designs, technology decisions, and architectural patterns."
# [/docs:bank-mission]

# [docs:bank-support-agent]
hindsight bank create support-bank
hindsight bank set-config support-bank \
  --observations-mission "I am a customer support agent. Track customer preferences, recurring issues, and resolution history."
# [/docs:bank-support-agent]

# [docs:update-bank-config]
hindsight bank set-config my-bank \
  --retain-mission "Always include technical decisions, API design choices, and architectural trade-offs. Ignore meeting logistics and social exchanges." \
  --retain-extraction-mode verbose \
  --observations-mission "Observations are stable facts about people and projects. Always include preferences, skills, and recurring patterns. Ignore one-off events." \
  --disposition-skepticism 4 \
  --disposition-literalism 4 \
  --disposition-empathy 2
# [/docs:update-bank-config]

# [docs:get-bank-config]
# Returns resolved config (server defaults merged with bank overrides)
hindsight bank config my-bank

# Show only bank-specific overrides
hindsight bank config my-bank --overrides-only
# [/docs:get-bank-config]

# [docs:reset-bank-config]
# Remove all bank-level overrides, reverting to server defaults
hindsight bank reset-config my-bank -y
# [/docs:reset-bank-config]

# =============================================================================
# Cleanup (not shown in docs)
# =============================================================================
for bank_id in my-bank architect-bank support-bank; do
  curl -s -X DELETE "${HINDSIGHT_URL}/v1/default/banks/${bank_id}" > /dev/null
done

echo "memory-banks.sh: All examples passed"
