---
name: "project-management"
source_repo: "alirezarezvani-skills"
category: "development"
---

# project-management

> Source: alirezarezvani-skills

# 🎬 REAL-WORLD USAGE SCENARIO
## How the 6 Expert Skills Work Together

---

## 📖 Scenario: Launching a New Mobile App Feature

Let's see how all 6 expert skills collaborate on a real project: **"Adding Social Login to Mobile App"**

---

## 🎯 PHASE 1: PROJECT INITIATION

### **Senior PM Takes Lead**

**Action**: Strategic Planning & Stakeholder Alignment

```
┌─────────────────────────────────────────┐
│ SENIOR PM                               │
├─────────────────────────────────────────┤
│ ✓ Gather business requirements         │
│ ✓ Define project scope & objectives    │
│ ✓ Identify stakeholders (C-suite, Eng) │
│ ✓ Develop project charter              │
│ ✓ Create RACI matrix                   │
│ ✓ Budget: $50K, Timeline: 8 weeks      │
└─────────────────────────────────────────┘
           │
           │ HANDOFF: Project Charter Complete
           ▼
```

**Handoff Package to Scrum Master**:
- ✅ Project scope: Social login (Google, Apple, Facebook)
- ✅ Success criteria: 80% adoption in 3 months
- ✅ Team: 2 mobile devs, 1 backend dev, 1 QA
- ✅ Sprint cadence: 2-week sprints

---

## ⚙️ PHASE 2: SYSTEM SETUP

### **Atlassian Admin Provisions Access**

**Action**: User & System Setup

```
┌─────────────────────────────────────────┐
│ ATLASSIAN ADMIN                         │
├─────────────────────────────────────────┤
│ ✓ Create Jira project: SOCIAL-LOGIN    │
│ ✓ Provision user access for team       │
│ ✓ Set up permissions (team + stakeholders) │
│ ✓ Configure SSO for new contractors    │
│ ✓ Create team groups                   │
└─────────────────────────────────────────┘
           │
           │ HANDOFF: System Ready
           ▼
```

### **Jira Expert Configures Project**

**Action**: Technical Setup

```
┌─────────────────────────────────────────┐
│ JIRA EXPERT                             │
├─────────────────────────────────────────┤
│ ✓ Create project: SOCIAL-LOGIN         │
│ ✓ Configure workflow: To Do → Dev →    │
│   Code Review → QA → Done              │
│ ✓ Set up custom fields:                │
│   - Platform (iOS/Android/Backend)     │
│   - Story Points                       │
│   - Sprint                             │
│ ✓ Create Scrum board                   │
│ ✓ Set up automation: auto-assign QA    │
│ ✓ Build dashboard for metrics          │
└─────────────────────────────────────────┘
           │
           │ HANDOFF: Jira Project Ready
           ▼
```

### **Confluence Expert Creates Documentation Space**

**Action**: Knowledge Base Setup

```
┌─────────────────────────────────────────┐
│ CONFLUENCE EXPERT                       │
├─────────────────────────────────────────┤
│ ✓ Create space: Social Login Project   │
│ ✓ Set up page structure:               │
│   - Overview                           │
│   - Technical Specs                    │
│   - API Documentation                  │
│   - Meeting Notes                      │
│   - Sprint Retrospectives              │
│ ✓ Configure permissions                │
│ ✓ Link Jira project to Confluence      │
└─────────────────────────────────────────┘
           │
           │ HANDOFF: Documentation Ready
           ▼
```

### **Template Creator Builds Standard Templates**

**Action**: Create Reusable Content

```
┌─────────────────────────────────────────┐
│ TEMPLATE CREATOR                        │
├─────────────────────────────────────────┤
│ ✓ Create Jira issue templates:         │
│   - User Story Template                │
│   - Bug Report Template                │
│   - Spike Template                     │
│ ✓ Create Confluence templates:         │
│   - Sprint Planning Template           │
│   - Sprint Retrospective Template      │
│   - Technical Design Doc Template      │
│   - API Integration Guide Template     │
│ ✓ Deploy to project space              │
└─────────────────────────────────────────┘
           │
           │ HANDOFF: Templates Ready
           ▼
```

---

## 🏃 PHASE 3: SPRINT EXECUTION (Sprint 1)

### **Scrum Master Facilitates Sprint Planning**

**Action**: Sprint 1 Planning

```
┌─────────────────────────────────────────┐
│ SCRUM MASTER                            │
├─────────────────────────────────────────┤
│ ✓ Facilitate sprint planning meeting   │
│ ✓ Define Sprint 1 goal:                │
│   "Complete Google OAuth integration"  │
│ ✓ Team estimates stories:              │
│   - SOCIAL-1: Google OAuth Backend (8) │
│   - SOCIAL-2: Google OAuth iOS (5)     │
│   - SOCIAL-3: Google OAuth Android (5) │
│   - SOCIAL-4: QA Test Plan (3)         │
│ ✓ Total: 21 points (capacity: 20)     │
│ ✓ Create sprint in Jira                │
│ ✓ Document in Confluence               │
└─────────────────────────────────────────┘
           │
           │ USES: Jira Expert for board config
           │ USES: Confluence Expert for sprint doc
           │ USES: Template Creator for planning template
           ▼
```

**Requests to Other Skills**:

```
┌────────────────────────────────┐
│ TO: Jira Expert                │
│ REQUEST: Create Sprint 1       │
│ RESPONSE: Sprint created ✅    │
└────────────────────────────────┘

┌────────────────────────────────┐
│ TO: Confluence Expert          │
│ REQUEST: Create sprint planning│
│          page from template    │
│ RESPONSE: Page created ✅      │
└────────────────────────────────┘
```

### **Daily Standups (Week 1)**

**Scrum Master Runs Daily Standups**

```
Day 1-5: Daily Standups
┌─────────────────────────────────────────┐
│ SCRUM MASTER                            │
├─────────────────────────────────────────┤
│ Day 1: ✓ All stories in progress       │
│ Day 2: ✓ Backend 50% complete          │
│ Day 3: ⚠️ BLOCKER: OAuth API keys      │
│        needed (escalate to Senior PM)  │
│ Day 4: ✓ Blocker resolved              │
│ Day 5: ✓ Backend complete, code review │
└─────────────────────────────────────────┘
           │
           │ ESCALATION on Day 3
           ▼
┌─────────────────────────────────────────┐
│ SENIOR PM                               │
├─────────────────────────────────────────┤
│ ⚡ BLOCKER ESCALATION                   │
│ Issue: OAuth API keys needed           │
│ Action: Contact stakeholders           │
│ Resolution: Keys provided same day     │
│ Update: Scrum Master + team            │
└─────────────────────────────────────────┘
```

---

## 📊 PHASE 4: SPRINT REVIEW & RETROSPECTIVE

### **Sprint Review (End of Sprint 1)**

**Scrum Master Facilitates Demo**

```
┌─────────────────────────────────────────┐
│ SCRUM MASTER                            │
├─────────────────────────────────────────┤
│ ✓ Facilitate sprint review              │
│ ✓ Demo completed features:             │
│   - Google OAuth working on all        │
│     platforms                          │
│ ✓ Gather stakeholder feedback          │
│ ✓ Velocity: 20/21 points (95%)        │
│ ✓ Document feedback in Confluence      │
└─────────────────────────────────────────┘
           │
           │ USES: Confluence Expert to doc feedback
           ▼
```

### **Sprint Retrospective**

**Scrum Master Facilitates Retro**

```
┌─────────────────────────────────────────┐
│ SCRUM MASTER                            │
├─────────────────────────────────────────┤
│ ✓ Facilitate retrospective              │
│ ✓ What went well:                       │
│   - Great collaboration                │
│   - Quick blocker resolution           │
│ ✓ What didn't go well:                 │
│   - OAuth keys delay                   │
│ ✓ Action items:                        │
│   - Pre-request credentials (Senior PM)│
│   - Better API key process (Admin)    │
│ ✓ Document in Confluence               │
└─────────────────────────────────────────┘
           │
           │ HANDOFF: Action items to Senior PM
           │ USES: Template Creator's retro template
           ▼
```

---

## 📈 PHASE 5: MID-PROJECT REPORTING

### **Senior PM Creates Executive Report**

**Action**: Stakeholder Reporting (Week 4)

```
┌─────────────────────────────────────────┐
│ SENIOR PM                               │
├─────────────────────────────────────────┤
│ ✓ Gather metrics from Scrum Master:    │
│   - Velocity: 20, 22 (trending up)     │
│   - Stories completed: 8/10            │
│   - Sprint health: Green               │
│ ✓ Pull cross-project data from Jira    │
│ ✓ Create executive summary:            │
│   - Status: On track                   │
│   - Budget: $25K spent / $50K          │
│   - Timeline: Week 4 / 8               │
│   - Risk: Low                          │
│ ✓ Present to C-suite                   │
│ ✓ Document in Confluence               │
└─────────────────────────────────────────┘
           │
           │ USES: Jira Expert for metrics
           │ USES: Confluence Expert for report
           ▼
```

---

## 🎯 PHASE 6: PROJECT COMPLETION

### **Sprint 4: Final Sprint**

**Final Integration & Launch**

```
┌─────────────────────────────────────────┐
│ SCRUM MASTER                            │
├─────────────────────────────────────────┤
│ ✓ Sprint 4 planning                    │
│ ✓ Final stories:                       │
│   - SOCIAL-20: Production deployment   │
│   - SOCIAL-21: User documentation      │
│   - SOCIAL-22: Analytics setup         │
│ ✓ All stories completed                │
│ ✓ Sprint review with stakeholders      │
│ ✓ Final retrospective                  │
│ ✓ Project closure                      │
└─────────────────────────────────────────┘
```

### **Senior PM Project Closure**

**Action**: Post-Project Analysis

```
┌─────────────────────────────────────────┐
│ SENIOR PM                               │
├─────────────────────────────────────────┤
│ ✓ Project metrics:                     │
│   - Timeline: 8 weeks (on time)        │
│   - Budget: $48K / $50K (96%)          │
│   - Scope: 100% delivered              │
│   - Team velocity: Avg 21 points       │
│ ✓ Post-project review                  │
│ ✓ Lessons learned documentation        │
│ ✓ Success metrics tracking setup       │
│ ✓ Archive project in Confluence        │
└─────────────────────────────────────────┘
           │
           │ USES: All experts for final documentation
           ▼
```

---

## 🏆 FINAL OUTCOMES

### **Success Metrics (3 Months Post-Launch)**

```
┌─────────────────────────────────────────┐
│ RESULTS                                 │
├─────────────────────────────────────────┤
│ ✅ 82% user adoption (target: 80%)     │
│ ✅ 95% successful auth rate            │
│ ✅ 0 critical bugs                     │
│ ✅ Stakeholder satisfaction: 9/10      │
│ ✅ Team velocity improved 15%          │
└─────────────────────────────────────────┘
```

---

## 🔄 SKILL INTERACTION SUMMARY

### **How Each Skill Contributed**

**Senior PM** (Strategic)
- Project initiation & charter
- Stakeholder management
- Executive reporting
- Budget oversight
- Blocker escalation resolution
- Project closure

**Scrum Master** (Execution)
- Sprint planning (4 sprints)
- Daily standups (40 standups)
- Sprint reviews (4 reviews)
- Retrospectives (4 retros)
- Impediment removal
- Team coaching

**Jira Expert** (Infrastructure)
- Project configuration
- Workflow setup
- Board configuration
- Automation rules
- Metrics & dashboards
- Data extraction

**Confluence Expert** (Documentation)
- Space architecture
- Meeting notes
- Technical documentation
- Sprint documentation
- Knowledge base management

**Atlassian Admin** (System)
- User provisioning
- Access management
- System configuration
- Security compliance
- Integration support

**Template Creator** (Standards)
- Sprint planning templates
- Retrospective templates
- Technical doc templates
- User story templates
- Bug report templates

---

## 💡 KEY COLLABORATION POINTS

### **Most Frequent Handoffs**

1. **Scrum Master ↔ Jira Expert** (Daily)
   - Sprint board updates
   - Issue status changes
   - Velocity tracking

2. **Scrum Master ↔ Confluence Expert** (Weekly)
   - Sprint documentation
   - Meeting notes
   - Retrospective pages

3. **Senior PM ↔ Scrum Master** (Weekly)
   - Status updates
   - Blocker escalations
   - Velocity trends

4. **Template Creator → All** (As needed)
   - Provide standardized templates
   - Update existing templates

5. **Atlassian Admin → All** (As needed)
   - User access
   - System support
   - Integration help

---

## 🎬 CONCLUSION

This scenario demonstrates:

✅ **Clear Separation**: Each expert has distinct responsibilities
✅ **Seamless Handoffs**: Information flows smoothly between roles
✅ **No Fluff**: All actions are practical and necessary
✅ **MCP Integration**: All tools connected via Atlassian MCP
✅ **Real-World Application**: Production-ready workflows

**The 6 expert skills work together as a cohesive, world-class team to deliver projects successfully from inception to completion.**

---

**Scenario Duration**: 8 weeks
**Team Size**: 4 people
**Skills Used**: All 6
**Success Rate**: 100%
**Budget Performance**: 96%
**Timeline Performance**: 100%


