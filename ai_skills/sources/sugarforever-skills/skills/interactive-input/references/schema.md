# Interactive Block Schema (v1)

## Root Structure

```json
{
  "id": "unique-block-id",
  "card": {
    "body": [ /* CardElement[] */ ],
    "actions": [ /* CardAction[] */ ]
  }
}
```

- `id` (string, required): Unique identifier for this block, used to correlate user responses
- `card.body` (array, required): List of UI elements to render
- `card.actions` (array, optional): Action buttons at the bottom of the card

## Card Elements

### TextBlock

Static text label. Use as question titles or descriptions.

```json
{ "type": "TextBlock", "text": "Your question here", "weight": "bold", "size": "md" }
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `text` | string | required | The text content |
| `weight` | `"normal"` \| `"bold"` | `"normal"` | Font weight |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Font size |

### Input.ChoiceSet

Single or multiple selection from a list of options.

```json
{
  "type": "Input.ChoiceSet",
  "id": "answer",
  "label": "Select your answer",
  "style": "expanded",
  "isMultiSelect": false,
  "choices": [
    { "title": "Option A", "value": "a" },
    { "title": "Option B", "value": "b" }
  ]
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | string | required | Input identifier for the response |
| `label` | string | optional | Label above the input |
| `style` | `"expanded"` \| `"compact"` | `"compact"` | `expanded` = radio/checkbox list, `compact` = dropdown |
| `isMultiSelect` | boolean | `false` | `true` for checkboxes, `false` for radio buttons |
| `choices` | array | required | List of `{ title, value }` objects |

### Input.Text

Free-form text input.

```json
{
  "type": "Input.Text",
  "id": "explanation",
  "label": "Show your work",
  "placeholder": "Type your answer...",
  "isMultiline": true
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | string | required | Input identifier |
| `label` | string | optional | Label above the input |
| `placeholder` | string | optional | Placeholder text |
| `isMultiline` | boolean | `false` | `true` for textarea, `false` for single-line input |

### Input.Number

Numeric input.

```json
{
  "type": "Input.Number",
  "id": "result",
  "label": "Final answer",
  "min": 0,
  "max": 100,
  "placeholder": "Enter a number"
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | string | required | Input identifier |
| `label` | string | optional | Label above the input |
| `min` | number | optional | Minimum value |
| `max` | number | optional | Maximum value |
| `placeholder` | string | optional | Placeholder text |

### Input.Toggle

Boolean toggle (checkbox).

```json
{
  "type": "Input.Toggle",
  "id": "confident",
  "label": "I am confident in my answer"
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | string | required | Input identifier |
| `label` | string | required | Label next to the checkbox |
| `valueOn` | string | optional | Value when checked |
| `valueOff` | string | optional | Value when unchecked |

### Separator

Visual divider between elements.

```json
{ "type": "Separator" }
```

## Card Actions

### Action.Submit

Submit button that collects all input values and sends them as a response.

```json
{ "type": "Action.Submit", "title": "Submit Answer" }
```

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Button label text |

## Complete Examples

### Single Choice Quiz

````markdown
```interactive
{
  "id": "math-q1",
  "card": {
    "body": [
      { "type": "TextBlock", "text": "What is 2 + 3 × 4?", "weight": "bold" },
      { "type": "Input.ChoiceSet", "id": "answer", "style": "expanded",
        "choices": [
          { "title": "A. 20", "value": "20" },
          { "title": "B. 14", "value": "14" },
          { "title": "C. 24", "value": "24" },
          { "title": "D. 11", "value": "11" }
        ]
      }
    ],
    "actions": [{ "type": "Action.Submit", "title": "Submit" }]
  }
}
```
````

### Multiple Choice

````markdown
```interactive
{
  "id": "even-numbers",
  "card": {
    "body": [
      { "type": "TextBlock", "text": "Select all even numbers:", "weight": "bold" },
      { "type": "Input.ChoiceSet", "id": "answer", "style": "expanded", "isMultiSelect": true,
        "choices": [
          { "title": "12", "value": "12" },
          { "title": "15", "value": "15" },
          { "title": "28", "value": "28" },
          { "title": "33", "value": "33" }
        ]
      }
    ],
    "actions": [{ "type": "Action.Submit", "title": "Submit" }]
  }
}
```
````

### Mixed Form (Show-your-work)

````markdown
```interactive
{
  "id": "geometry-q1",
  "card": {
    "body": [
      { "type": "TextBlock", "text": "A rectangle is 8cm long and 5cm wide. Find the perimeter.", "weight": "bold" },
      { "type": "Input.Text", "id": "steps", "label": "Show your work", "isMultiline": true, "placeholder": "Write your steps..." },
      { "type": "Separator" },
      { "type": "Input.Number", "id": "answer", "label": "Final answer (cm)" }
    ],
    "actions": [{ "type": "Action.Submit", "title": "Submit Answer" }]
  }
}
```
````

### Survey / Feedback

````markdown
```interactive
{
  "id": "feedback",
  "card": {
    "body": [
      { "type": "TextBlock", "text": "How was this lesson?", "weight": "bold" },
      { "type": "Input.ChoiceSet", "id": "rating", "style": "expanded",
        "choices": [
          { "title": "Excellent", "value": "5" },
          { "title": "Good", "value": "4" },
          { "title": "Average", "value": "3" },
          { "title": "Needs improvement", "value": "2" }
        ]
      },
      { "type": "Input.Text", "id": "comment", "label": "Any comments?", "placeholder": "Optional feedback...", "isMultiline": true },
      { "type": "Input.Toggle", "id": "more", "label": "I want more practice on this topic" }
    ],
    "actions": [{ "type": "Action.Submit", "title": "Send Feedback" }]
  }
}
```
````
