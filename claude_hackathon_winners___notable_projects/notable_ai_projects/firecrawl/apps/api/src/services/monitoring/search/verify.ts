import { containsAlias, tokenizeContent, type GoalCriteria } from "./criteria";

export type VerifyEvidence = {
  url: string;
  titleText: string;
  claimText: string;
  pageText: string;
};

type VerificationFailure = { check: string; detail: string };

export type VerificationResult = {
  pass: boolean;
  failures: VerificationFailure[];
  criteriaSource: GoalCriteria["generatedBy"];
};

export function verifyAlertCandidate(params: {
  criteria: GoalCriteria;
  evidence: VerifyEvidence;
  concept: string;
}): VerificationResult {
  const { criteria, evidence } = params;
  const failures: VerificationFailure[] = [];

  const pageBackedText = [
    evidence.titleText,
    evidence.claimText,
    String(evidence.pageText ?? "").slice(0, 20000),
  ]
    .filter(Boolean)
    .join(" ");
  const conceptText = String(params.concept ?? "");
  const hasPageContent = Boolean(String(evidence.pageText ?? "").trim());

  if (
    criteria.subjectAliases.length > 0 &&
    hasPageContent &&
    pageBackedText.trim()
  ) {
    const present = criteria.subjectAliases.some(
      alias =>
        containsAlias(pageBackedText, alias) ||
        tokenizeContent(alias).some(token =>
          containsAlias(pageBackedText, token),
        ),
    );
    if (!present) {
      failures.push({
        check: "subject_missing",
        detail: `none of [${criteria.subjectAliases.join(", ")}] appear in the page evidence`,
      });
    }
  }

  if (criteria.excludedSubjects.length > 0 && conceptText) {
    const conceptNamesAlias = criteria.subjectAliases.some(alias =>
      containsAlias(conceptText, alias),
    );
    const excludedInConcept = criteria.excludedSubjects.find(
      excluded =>
        containsAlias(conceptText, excluded) ||
        containsAlias(evidence.titleText, excluded),
    );
    if (excludedInConcept && !conceptNamesAlias) {
      failures.push({
        check: "excluded_subject",
        detail: `the story is about "${excludedInConcept}", which this monitor excludes`,
      });
    }
  }

  if (
    criteria.generatedBy === "llm" &&
    criteria.mustConcern.length > 0 &&
    conceptText
  ) {
    const conceptTokens = new Set(tokenizeContent(conceptText));
    const topicPresent = criteria.mustConcern.some(token =>
      conceptTokens.has(token),
    );
    if (conceptTokens.size > 0 && !topicPresent) {
      failures.push({
        check: "concept_off_goal",
        detail: `alert concept "${conceptText.slice(0, 80)}" shares no goal terms with the monitor`,
      });
    }
  }

  if (criteria.thirdPartyOnly === true && criteria.ownedHosts.length > 0) {
    const host = hostOf(evidence.url);
    const owned =
      host &&
      criteria.ownedHosts.find(
        ownedHost => host === ownedHost || host.endsWith(`.${ownedHost}`),
      );
    if (owned) {
      failures.push({
        check: "owned_surface",
        detail: `${host} is operated by the monitored subject`,
      });
    }
  }

  return {
    pass: failures.length === 0,
    failures,
    criteriaSource: criteria.generatedBy,
  };
}

function hostOf(url: string): string {
  try {
    return new URL(String(url ?? "")).hostname
      .toLowerCase()
      .replace(/^www\./, "");
  } catch {
    return "";
  }
}
