import { ErrorCodes, TransportableError } from "../error";
import type { ThreatDecision } from "./types";

// Error surfaced when threat protection blocks a domain. Wired into the shared
// TransportableError machinery (src/lib/error.ts + src/lib/error-serde.ts) so
// blocked scrapes surface as a clean, documented API error — both on sync
// responses (`code: "unsafe_domain_blocked"`) and on crawl/batch job document
// errors. The full ThreatDecision rides along in serialize() so the billing
// and security-logging layers can read it even across the job queue.

export class UnsafeDomainBlockedError extends TransportableError {
  constructor(
    public readonly domain: string,
    public readonly decision: ThreatDecision,
  ) {
    super(
      "unsafe_domain_blocked",
      `This domain (${domain}) is blocked by your organization's threat protection policy (rule: ${decision.rule}). ` +
        `If you believe this is a mistake, contact your organization administrator to adjust the policy (e.g. whitelist the domain).`,
    );
    this.name = "UnsafeDomainBlockedError";
  }

  serialize() {
    return {
      ...super.serialize(),
      domain: this.domain,
      decision: this.decision,
    };
  }

  static deserialize(
    _code: ErrorCodes,
    data: ReturnType<typeof this.prototype.serialize>,
  ) {
    const x = new UnsafeDomainBlockedError(data.domain, data.decision);
    x.stack = data.stack;
    return x;
  }
}
