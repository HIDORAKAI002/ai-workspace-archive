# Tool Prompt: schedule-recurring-reminders-2

- Name: CronCreate

## Summary

Set up one-time or recurring reminders.

# Raw Prompt Text
Schedule a prompt to be enqueued at a future time. Use for both recurring schedules and one-shot reminders.

Uses standard ${NUM}-field cron in the user's local timezone: minute hour day-of-month month day-of-week. "${NUM} ${NUM} * * *" means 9am local — no timezone conversion needed.

## One-shot tasks (recurring: false)

For "remind me at X" or "at <time>, do Y" requests — fire once then auto-delete.
Pin minute${PATH} to specific values:
  "remind me at ${NUM}:30pm today to check the deploy" → cron: "${NUM} ${NUM} <today_dom> <today_month> *", recurring: false
  "tomorrow morning, run the smoke test" → cron: "${NUM} ${NUM} <tomorrow_dom> <tomorrow_month> *", recurring: false

## Recurring jobs (recurring: true, the default)

For "every N minutes" / "every hour" / "weekdays at 9am" requests:
  "*/${NUM} * * * *" (every ${NUM} min), "${NUM} * * * *" (hourly), "${NUM} ${NUM} * * ${NUM}-${NUM}" (weekdays at 9am local)

## Avoid the :${NUM} and :${NUM} minute marks when the task allows it

Every user who asks for "9am" gets `${NUM} ${NUM}`, and every user who asks for "hourly" gets `${NUM} *` — which means requests from across the planet land on the API at the same instant. When the user's request is approximate, pick a minute that is NOT ${NUM} or ${NUM}:
  "every morning around ${NUM}" → "${NUM} ${NUM} * * *" or "${NUM} ${NUM} * * *" (not "${NUM} ${NUM} * * *")
  "hourly" → "${NUM} * * * *" (not "${NUM} * * * *")
  "in an hour or so, remind me to..." → pick whatever minute you land on, don't round

Only use minute ${NUM} or ${NUM} when the user names that exact time and clearly means it ("at ${NUM}:${NUM} sharp", "at half past", coordinating with a meeting). When in doubt, nudge a few minutes early or late — the user will not notice, and the fleet will.

${EXPR_1}

## Runtime behavior

Jobs only fire while the REPL is idle (not mid-query). ${EXPR_2}The scheduler adds a small deterministic jitter on top of whatever you pick: recurring tasks fire up to ${NUM}% of their period late (max ${NUM} min); one-shot tasks landing on :${NUM} or :${NUM} fire up to ${NUM} s early. Picking an off-minute is still the bigger lever.

Recurring tasks auto-expire after ${EXPR_3} days — they fire one final time, then are deleted. This bounds session lifetime. Tell the user about the ${EXPR_4}-day limit when scheduling recurring jobs.

Returns a job ID you can pass to CronDelete.
