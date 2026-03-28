# Professional Email Response Template

Write professional emails that don't sound like AI-generated robots.

## Use Cases
- Responding to customer inquiries
- Professional business communication
- Declining requests politely
- Follow-up emails
- Networking emails

## Template

```xml
<task>Write a professional email response</task>

<original_email>
[PASTE THE EMAIL YOU RECEIVED]
</original_email>

<my_situation>
[Explain what you want to communicate:
- What you're responding to
- Your decision/answer
- Any actions you'll take
- Timeline or next steps]
</my_situation>

<tone>
[Professional but warm / Formal / Casual / Apologetic / etc.]
</tone>

<thinking>
Before writing:
1. What's the main point they need to know?
2. What action do I need from them (if any)?
3. What questions did they ask that I need to answer?
4. What's the right tone for this relationship?
</thinking>

<requirements>
- Address all points from their email
- Max 150 words (unless complex topic requires more)
- Clear next step or call-to-action
- Sounds human, not robotic
- Appropriate level of formality

AVOID these phrases:
- "I hope this email finds you well"
- "Please don't hesitate to reach out"
- "Per my last email"
- "Synergize", "circle back", "touch base"
- "I trust this email finds you in good spirits"
</requirements>

<email_structure>
1. **Opening** - Acknowledge their email (briefly)
2. **Body** - Main message (answer questions, provide info)
3. **Action** - What happens next (if anything)
4. **Close** - Simple, appropriate sign-off
</email_structure>

<output_format>
Provide:

**Subject Line** (if replying to different topic)
Re: [Their subject]

**Email Body**

**Why This Works** (optional)
- Brief explanation of tone/structure choices
</output_format>
```

## Example Usage

### Input
```xml
<task>Write a professional email response</task>

<original_email>
Hi,

I saw your pricing page and I'm interested in the Enterprise plan. However, our team is only 12 people, not 50+ like your pricing shows. Can we get Enterprise features with a smaller team? We specifically need SSO and advanced permissions.

Also, do you offer a free trial for Enterprise?

Thanks,
Sarah
</original_email>

<my_situation>
We do offer custom pricing for smaller teams that need Enterprise features. Yes, we can do a 14-day trial. I want to set up a call to understand their needs and see if we're a good fit.
</my_situation>

<tone>Professional but warm - she's a potential customer, make her feel heard</tone>

[Rest of template...]
```

### Expected Output

**Subject Line:**
Re: Enterprise plan for smaller team

**Email Body:**

Hi Sarah,

Good news - we can definitely work with a 12-person team for Enterprise features. You're not the first to need SSO and advanced permissions without having 50+ users yet.

Here's what I'm thinking:
- Custom pricing based on your 12 users
- 14-day Enterprise trial so you can test SSO and permissions
- 30-minute call to make sure we're set up for exactly what you need

Are you available for a quick call this week? I have slots Thursday 2pm or Friday 10am (EST). If those don't work, send over a few times that do.

Best,
[Your name]

---

**Why This Works:**
- Immediately answers her question (yes, we can do this)
- Addresses both asks (pricing + trial)
- Gives specific next steps (call times)
- Warm but professional
- Short and scannable
- Doesn't sound like a template

---

## Variations

### For Declining Requests
```xml
<my_situation>
I need to decline this request but maintain the relationship
</my_situation>

<requirements>
- Decline clearly (don't leave them hanging)
- Explain why (briefly)
- Offer alternative if possible
- Keep door open for future
</requirements>

<structure>
1. Thank them for reaching out
2. Clear "no" (but kind)
3. Brief reason
4. Alternative suggestion (if any)
5. Keep relationship warm
</structure>
```

### For Apologies/Problem Resolution
```xml
<my_situation>
We made a mistake. I need to apologize and fix it.
</my_situation>

<requirements>
- Own the mistake (no excuses)
- Explain what happened (briefly)
- State how we're fixing it
- Prevent future occurrence
- Offer compensation if appropriate
</requirements>
```

## Tips for Best Results

1. **Paste the full email thread** - Context matters
2. **Be specific about your goal** - What do you want them to do?
3. **Mention relationship context** - New lead, long-time customer, colleague, boss, etc.
4. **Specify urgency** - Do they need to respond today, this week, whenever?

---

**Back to [Main README](../README.md)**
