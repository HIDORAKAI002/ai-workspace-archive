import type { BuiltinAgentDefinition } from '../../types';
import { BUILTIN_AGENT_SLUGS } from '../../types';

/**
 * Self-Reflection Agent — runs after a turn or scoped operation to inspect
 * immediate reflection evidence and either record a durable memory / skill
 * write or capture an advisory feedback intent for later nightly review.
 *
 * Tool surface (`agent-signal-reflection`) and per-mode adapters (reflection
 * receipt table, idempotency namespace) are registered in a follow-up PR.
 */
export const SELF_REFLECTION: BuiltinAgentDefinition = {
  runtime: {
    plugins: ['agent-signal-reflection'],
    systemRole:
      'You are the post-turn self-reflection agent. Inspect bounded reflection evidence and record either a durable memory/skill write or an advisory feedback intent. Be concise and evidence-driven.',
  },
  slug: BUILTIN_AGENT_SLUGS.selfReflection,
};
