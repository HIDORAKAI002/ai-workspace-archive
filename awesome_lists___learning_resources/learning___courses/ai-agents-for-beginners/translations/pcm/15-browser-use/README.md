# Building Computer Use Agents (CUA)

Computer use agents fit interact wit websites di same way pesin go fit: by opening browser, inspect di page, and take di next beta action from wetin dem see. For dis lesson, you go build browser automation agent wey go search Airbnb, comot structured listing data, and find di cheapest place to stay for Stockholm.

Dis lesson join Browser-Use for AI-driven navigation, Playwright and Chrome DevTools Protocol (CDP) for browser control, Azure OpenAI for vision-enabled reasoning, and Pydantic for structured extraction.

## Introduction

Dis lesson go cover:

- Understand when computer use agents betta pass API-only automation
- Join Browser-Use with Playwright and CDP for reliable browser lifecycle management
- Use Azure OpenAI vision and structured Pydantic output comot listing data from dynamic web pages
- Decide when to use agent-first, actor-first, or hybrid browser automation workflow

## Learning Goals

After you finish dis lesson, you go sabi how to:

- Configure Browser-Use with Azure OpenAI and Playwright
- Build browser automation workflow wey go navigate real website and handle dynamic UI elements
- Extract typed results from wetin show for page and convert am to downstream business logic
- Choose between agent and actor patterns based on how predictable di browser task be

## Code Sample

Dis lesson get one notebook tutorial:

- [15-browser-user.ipynb](./15-browser-user.ipynb): E go launch Chrome session over CDP, search Airbnb for Stockholm listings, extract prices wit Browser-Use vision, and return di cheapest option as structured data.

## Prerequisites

- Python 3.12+
- Azure OpenAI deployment wey dem don set for your environment
- Chrome or Chromium wey install for your machine
- Playwright dependencies wey install
- Basic understanding of async Python

## Setup

Install di packages wey notebook dey use:

```bash
pip install browser_use playwright python-dotenv
playwright install chromium
```

Set di Azure OpenAI environment variables wey notebook go use:

```bash
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_CHAT_DEPLOYMENT_NAME=...
# Optional: if you no put am, e go use the latest API version as default
AZURE_OPENAI_API_VERSION=...
```

## Architecture Overview

Di notebook show how hybrid browser automation workflow dey work:

1. Chrome go start wit CDP enabled so Playwright and Browser-Use fit share di same browser session.
2. Browser-Use agent go handle open-ended navigation tasks like opening Airbnb, dismissing pop-ups, and searching Stockholm.
3. Di active page go dey inspected wit structured Pydantic schema to extract listing titles, nightly prices, ratings, and URLs.
4. Python logic go compare di extracted listings and show di cheapest result.

Dis approach dey keep di flexible, vision-based reasoning wey Browser-Use sabi, but still give you deterministic browser control when you need am.

## Key Takeaways and Best Practices

### When to Use Agent Vs Actor

| Scenario | Use Agent | Use Actor |
|----------|-----------|-----------|
| Dynamic layouts | Yes, AI fit adjust to page changes | No, brittle selectors fit spoil |
| Known structure | No, agent slow pass direct control | Yes, e fast and precise |
| Finding elements | Yes, natural language dey work well | No, exact selectors required |
| Timing control | No, e less predictable | Yes, you get full control over waits and retries |
| Complex workflows | Yes, e fit handle unexpected UI states | No, e need explicit branching |

### Browser-Use Best Practices

1. Start wit agent for exploration and dynamic navigation.
2. Switch to direct page control when interaction don become predictable.
3. Use structured output models so extracted data go validate and type-safe.
4. Add delays strategically after actions wey fit trigger visible UI changes.
5. Capture screenshots while you dey iterate so failures go easy to debug.
6. Expect websites to change and design fallback strategies for pop-ups and layout shifts.
7. Blend agent and actor patterns to get both flexibility and precision.

### Real-World Applications

- Travel booking and price monitoring
- E-commerce price comparison and availability checks
- Structured extraction from dynamic websites
- Vision-aware UI testing and verification
- Website monitoring and alerting
- Intelligent form filling across multi-step flows

## Additional Resources

- [Browser-Use Playwright integration template](https://docs.browser-use.com/examples/templates/playwright-integration)
- [Browser-Use actor parameters and content extraction](https://docs.browser-use.com/customize/actor/all-parameters)
- [Course Setup](../00-course-setup/README.md)

---

<!-- CO-OP TRANSLATOR DISCLAIMER START -->
**Disclaimer**:  
Dis document don translate wit AI translation service [Co-op Translator](https://github.com/Azure/co-op-translator). Even though we dey try make am correct, abeg sabi say automated translation fit get some errors or mistakes. Di original document wey dey im kain language na di main correct source. For important mata, make person wey sabi human translation do am. We no go take blame if people misunderstand or interpret am wrong because of dis translation.
<!-- CO-OP TRANSLATOR DISCLAIMER END -->