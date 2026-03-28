# Meeting Notes to Action Items Template

Transform messy meeting notes into clear, actionable tasks.

## Use Cases
- Extract action items from meeting notes
- Identify decisions made
- Create task lists with owners
- Follow-up after meetings
- Prevent "wait, who's doing that?" moments

## Template

```xml
<task>Convert these meeting notes into clear action items</task>

<meeting_notes>
[PASTE YOUR NOTES - can be messy, incomplete, bullet points, whatever you have]
</meeting_notes>

<meeting_context>
- Date: [DATE]
- Attendees: [WHO WAS THERE]
- Purpose: [WHY YOU MET]
</meeting_context>

<thinking>
Extract from the notes:
1. What decisions were actually made? (not just discussed)
2. Who committed to doing what?
3. What are the deadlines or timeframes?
4. What's blocking progress?
5. What questions remain unanswered?
</thinking>

<output_format>
# Meeting Summary: [TOPIC]
**Date:** [DATE]
**Attendees:** [NAMES]

## Decisions Made
- [Clear decision with context]
- [Another decision]

## Action Items

### High Priority
- [ ] **Task description**
  - **Owner:** [Name]
  - **Due:** [Date or timeframe]
  - **Depends on:** [Other tasks/people/resources]
  - **Status:** Not started

### Medium Priority
- [ ] **Task description**
  - **Owner:** [Name]
  - **Due:** [Date or timeframe]

### Low Priority / Future
- [ ] **Task description**
  - **Owner:** [Name or "TBD"]
  - **Due:** [Date or "No deadline set ⚠️"]

## Open Questions (need decisions)
- [Question that wasn't resolved]
- [Who should decide]

## Parking Lot (mentioned but not actionable yet)
- [Ideas that came up but need more discussion]
- [Topics to revisit later]

## Next Meeting
- **Date/Time:** [When]
- **Agenda:** [What to cover]
- **Prep needed:** [What people should prepare]
</output_format>
```

## Example Usage

### Input
```xml
<task>Convert these meeting notes into clear action items</task>

<meeting_notes>
Product roadmap Q2 meeting

Sarah mentioned the new dashboard feature is taking longer than expected - lots of edge cases with the data visualizations. Might slip to Q3.

John wants to prioritize mobile app improvements - seeing 60% of traffic on mobile but conversion is half of desktop. Thinks we should fix that before new features.

Discussion about whether to build in-house analytics or integrate with existing tools. No decision yet - need cost comparison.

Maria volunteered to do user research interviews for the dashboard redesign. Needs 10-15 users, will take 2-3 weeks.

We agreed to push the API v2 launch to May instead of April. Breaking changes need more testing.

Budget discussion - need approval for additional contractor help. Sarah to check with finance.

Mobile app improvements - John to spec out what needs fixing by end of week. Then we'll estimate effort.

Security audit - compliance team requested this. Nobody assigned yet. Needs to happen before Q3.
</meeting_notes>

<meeting_context>
- Date: March 15, 2024
- Attendees: Sarah (Product), John (Engineering), Maria (UX), Mike (taking notes)
- Purpose: Q2 roadmap prioritization
</meeting_context>

[Rest of template...]
```

### Expected Output

# Meeting Summary: Q2 Roadmap Prioritization
**Date:** March 15, 2024
**Attendees:** Sarah (Product), John (Engineering), Maria (UX), Mike (notes)

## Decisions Made
- **API v2 launch moved to May** (was April) - needs more testing for breaking changes
- **Mobile app improvements prioritized over new features** - mobile conversion is 50% of desktop despite 60% traffic
- **Dashboard feature may slip to Q3** - edge cases with data visualizations taking longer than planned

## Action Items

### High Priority
- [ ] **Spec out mobile app improvements**
  - **Owner:** John
  - **Due:** End of week (March 22)
  - **Depends on:** Nothing (can start now)
  - **Status:** Not started
  - **Next step:** Engineering team will estimate effort after spec is done

- [ ] **Get finance approval for contractor budget**
  - **Owner:** Sarah
  - **Due:** ASAP (blocking other work)
  - **Depends on:** Finance team availability
  - **Status:** Not started

- [ ] **Conduct user research interviews for dashboard**
  - **Owner:** Maria
  - **Due:** 2-3 weeks (by April 5)
  - **Depends on:** Recruiting 10-15 users
  - **Status:** In progress (Maria volunteered)

### Medium Priority
- [ ] **Cost comparison: build analytics in-house vs. integrate existing tools**
  - **Owner:** TBD ⚠️
  - **Due:** Before next roadmap meeting
  - **Depends on:** Engineering estimate + vendor quotes
  - **Status:** Not started

- [ ] **Complete API v2 testing**
  - **Owner:** John's team
  - **Due:** Before May launch
  - **Depends on:** Breaking changes documented
  - **Status:** In progress

### Low Priority / Future
- [ ] **Security audit (compliance requirement)**
  - **Owner:** Not assigned ⚠️
  - **Due:** Before Q3 (June 30)
  - **Depends on:** Assigning owner
  - **Status:** Not started
  - **Note:** Compliance team requested - need to prioritize this

## Open Questions (need decisions)
- **Analytics:** Build in-house or integrate? (Need cost comparison first)
- **Dashboard timeline:** Can we still hit Q2 or officially move to Q3?
- **Security audit owner:** Who should lead this? (Compliance requirement)
- **Contractor budget amount:** How much do we need?

## Parking Lot (mentioned but not actionable yet)
- Dashboard edge cases with data visualizations (Maria's research will inform this)
- Desktop vs. mobile conversion gap (John investigating)

## Next Meeting
- **Date/Time:** March 29, 2024, 2:00 PM
- **Agenda:**
  - Review mobile app spec and estimates
  - Analytics build vs. buy decision
  - Contractor budget update
  - Finalize Q2 deliverables
- **Prep needed:**
  - John: Mobile app spec complete
  - Sarah: Contractor budget proposal
  - TBD: Analytics cost comparison

---

## Variations

### For Sprint Planning Meetings
```xml
<output_format>
# Sprint [NUMBER] Planning

## Sprint Goal
[What we're trying to accomplish]

## Committed Stories
- [ ] [Story title] - [Points] - [Owner]

## Stretch Goals (if time permits)
- [ ] [Story title] - [Points]

## Blockers
- [What's blocking progress]

## Definition of Done
- [Criteria for completion]
</output_format>
```

### For Executive/Strategy Meetings
```xml
<focus>
- Strategic decisions
- Budget allocations
- Timeline commitments
- Risk assessments
- Key metrics/goals
</focus>
```

## Tips for Best Results

1. **Include context** - Who attended, why you met
2. **Messy notes are fine** - AI will structure them
3. **Mention verbal commitments** - "Sarah said she'd handle this"
4. **Note pending items** - Things that need follow-up
5. **Include dates if mentioned** - Deadlines, launch dates, etc.

---

**Back to [Main README](../README.md)**
