import {
  layoutNextLine,
  prepareWithSegments,
  walkLineRanges,
  type LayoutCursor,
  type PreparedTextWithSegments,
} from '../../src/layout.ts'

type TextStyleName = 'body' | 'link' | 'code'
type ChipTone = 'mention' | 'status' | 'priority' | 'time' | 'count'

type RichInlineSpec =
  | { kind: 'text'; text: string; style: TextStyleName }
  | { kind: 'chip'; label: string; tone: ChipTone }

type TextStyleModel = {
  className: string
  chromeWidth: number
  font: string
}

type TextInlineItem = {
  kind: 'text'
  className: string
  chromeWidth: number
  endCursor: LayoutCursor
  fullText: string
  fullWidth: number
  leadingGap: number
  prepared: PreparedTextWithSegments
}

type ChipInlineItem = {
  kind: 'chip'
  className: string
  leadingGap: number
  text: string
  width: number
}

type InlineItem = TextInlineItem | ChipInlineItem

type LineFragment = {
  className: string
  leadingGap: number
  text: string
}

type RichLine = {
  fragments: LineFragment[]
}

type State = {
  events: {
    sliderValue: number | null
  }
  requestedWidth: number
}

const BODY_FONT = '500 17px "Helvetica Neue", Helvetica, Arial, sans-serif'
const LINK_FONT = '600 17px "Helvetica Neue", Helvetica, Arial, sans-serif'
const CODE_FONT = '600 14px "SF Mono", ui-monospace, Menlo, Monaco, monospace'
const CHIP_FONT = '700 12px "Helvetica Neue", Helvetica, Arial, sans-serif'

const TEXT_STYLES = {
  body: {
    className: 'frag frag--body',
    chromeWidth: 0,
    font: BODY_FONT,
  },
  code: {
    className: 'frag frag--code',
    chromeWidth: 14,
    font: CODE_FONT,
  },
  link: {
    className: 'frag frag--link',
    chromeWidth: 0,
    font: LINK_FONT,
  },
} satisfies Record<TextStyleName, TextStyleModel>

const CHIP_CLASS_NAMES = {
  count: 'frag chip chip--count',
  mention: 'frag chip chip--mention',
  priority: 'frag chip chip--priority',
  status: 'frag chip chip--status',
  time: 'frag chip chip--time',
} satisfies Record<ChipTone, string>

const LINE_START_CURSOR: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }

const LINE_HEIGHT = 34
const LAST_LINE_BLOCK_HEIGHT = 24
const NOTE_SHELL_CHROME_X = 40
const BODY_MIN_WIDTH = 260
const BODY_DEFAULT_WIDTH = 516
const BODY_MAX_WIDTH = 760
const PAGE_MARGIN = 28
const CHIP_CHROME_WIDTH = 22
const UNBOUNDED_WIDTH = 100_000

const collapsedSpaceWidthCache = new Map<string, number>()
const INLINE_BOUNDARY_GAP = measureCollapsedSpaceWidth(BODY_FONT)

const INLINE_SPECS: RichInlineSpec[] = [
  { kind: 'text', text: 'Ship ', style: 'body' },
  { kind: 'chip', label: '@maya', tone: 'mention' },
  { kind: 'text', text: "'s ", style: 'body' },
  { kind: 'text', text: 'rich-note', style: 'code' },
  { kind: 'text', text: ' card once ', style: 'body' },
  { kind: 'text', text: 'pre-wrap', style: 'code' },
  { kind: 'text', text: ' lands. Status ', style: 'body' },
  { kind: 'chip', label: 'blocked', tone: 'status' },
  { kind: 'text', text: ' by ', style: 'body' },
  { kind: 'text', text: 'vertical text', style: 'link' },
  { kind: 'text', text: ' research, but 北京 copy and Arabic QA are both green ✅. Keep ', style: 'body' },
  { kind: 'chip', label: 'جاهز', tone: 'status' },
  { kind: 'text', text: ' for ', style: 'body' },
  { kind: 'text', text: 'Cmd+K', style: 'code' },
  { kind: 'text', text: ' docs; the review bundle now includes 中文 labels, عربي fallback, and one more launch pass 🚀 for ', style: 'body' },
  { kind: 'chip', label: 'Fri 2:30 PM', tone: 'time' },
  { kind: 'text', text: '. Keep ', style: 'body' },
  { kind: 'text', text: 'layoutNextLine()', style: 'code' },
  { kind: 'text', text: ' public, tag this ', style: 'body' },
  { kind: 'chip', label: 'P1', tone: 'priority' },
  { kind: 'text', text: ', keep ', style: 'body' },
  { kind: 'chip', label: '3 reviewers', tone: 'count' },
  { kind: 'text', text: ', and route feedback to ', style: 'body' },
  { kind: 'text', text: 'design sync', style: 'link' },
  { kind: 'text', text: '.', style: 'body' },
]

const domCache = {
  root: document.documentElement, // cache lifetime: page
  noteBody: getRequiredDiv('note-body'), // cache lifetime: page
  widthSlider: getRequiredInput('width-slider'), // cache lifetime: page
  widthValue: getRequiredSpan('width-value'), // cache lifetime: page
}

const items = prepareInlineItems(INLINE_SPECS)

const st: State = {
  events: {
    sliderValue: null,
  },
  requestedWidth: BODY_DEFAULT_WIDTH,
}

let scheduledRaf: number | null = null

domCache.widthSlider.addEventListener('input', () => {
  st.events.sliderValue = Number.parseInt(domCache.widthSlider.value, 10)
  scheduleRender()
})

window.addEventListener('resize', () => scheduleRender())

scheduleRender()

function getRequiredDiv(id: string): HTMLDivElement {
  const element = document.getElementById(id)
  if (!(element instanceof HTMLDivElement)) throw new Error(`#${id} not found`)
  return element
}

function getRequiredInput(id: string): HTMLInputElement {
  const element = document.getElementById(id)
  if (!(element instanceof HTMLInputElement)) throw new Error(`#${id} not found`)
  return element
}

function getRequiredSpan(id: string): HTMLSpanElement {
  const element = document.getElementById(id)
  if (!(element instanceof HTMLSpanElement)) throw new Error(`#${id} not found`)
  return element
}

function scheduleRender(): void {
  if (scheduledRaf !== null) return
  scheduledRaf = requestAnimationFrame(function renderRichNoteDemo() {
    scheduledRaf = null
    render()
  })
}

function measureSingleLineWidth(prepared: PreparedTextWithSegments): number {
  let maxWidth = 0
  walkLineRanges(prepared, UNBOUNDED_WIDTH, line => {
    if (line.width > maxWidth) maxWidth = line.width
  })
  return maxWidth
}

function measureCollapsedSpaceWidth(font: string): number {
  const cached = collapsedSpaceWidthCache.get(font)
  if (cached !== undefined) return cached

  const joinedWidth = measureSingleLineWidth(prepareWithSegments('A A', font))
  const compactWidth = measureSingleLineWidth(prepareWithSegments('AA', font))
  const collapsedWidth = Math.max(0, joinedWidth - compactWidth)
  collapsedSpaceWidthCache.set(font, collapsedWidth)
  return collapsedWidth
}

function prepareInlineItems(specs: RichInlineSpec[]): InlineItem[] {
  const items: InlineItem[] = []
  let pendingGap = 0

  for (let index = 0; index < specs.length; index++) {
    const spec = specs[index]!

    switch (spec.kind) {
      case 'chip': {
        const prepared = prepareWithSegments(spec.label, CHIP_FONT)
        items.push({
          kind: 'chip',
          className: CHIP_CLASS_NAMES[spec.tone],
          leadingGap: pendingGap,
          text: spec.label,
          width: Math.ceil(measureSingleLineWidth(prepared)) + CHIP_CHROME_WIDTH,
        })
        pendingGap = 0
        break
      }

      case 'text': {
        const carryGap = pendingGap
        const hasLeadingWhitespace = /^\s/.test(spec.text)
        const hasTrailingWhitespace = /\s$/.test(spec.text)
        const trimmedText = spec.text.trim()
        pendingGap = hasTrailingWhitespace ? INLINE_BOUNDARY_GAP : 0
        if (trimmedText.length === 0) break

        const style = TEXT_STYLES[spec.style]
        const prepared = prepareWithSegments(trimmedText, style.font)
        const wholeLine = layoutNextLine(prepared, LINE_START_CURSOR, UNBOUNDED_WIDTH)
        if (wholeLine === null) break

        items.push({
          kind: 'text',
          className: style.className,
          chromeWidth: style.chromeWidth,
          endCursor: wholeLine.end,
          fullText: wholeLine.text,
          fullWidth: wholeLine.width,
          leadingGap: carryGap > 0 || hasLeadingWhitespace ? INLINE_BOUNDARY_GAP : 0,
          prepared,
        })
        break
      }
    }
  }

  return items
}

function cursorsMatch(a: LayoutCursor, b: LayoutCursor): boolean {
  return a.segmentIndex === b.segmentIndex && a.graphemeIndex === b.graphemeIndex
}

function layoutInlineItems(items: InlineItem[], maxWidth: number): RichLine[] {
  const lines: RichLine[] = []
  const safeWidth = Math.max(1, maxWidth)

  let itemIndex = 0
  let textCursor: LayoutCursor | null = null

  while (itemIndex < items.length) {
    const fragments: LineFragment[] = []
    let lineWidth = 0
    let remainingWidth = safeWidth

    lineLoop:
    while (itemIndex < items.length) {
      const item = items[itemIndex]!

      switch (item.kind) {
        case 'chip': {
          const leadingGap = fragments.length === 0 ? 0 : item.leadingGap
          if (fragments.length > 0 && leadingGap + item.width > remainingWidth) break lineLoop

          fragments.push({
            className: item.className,
            leadingGap,
            text: item.text,
          })
          lineWidth += leadingGap + item.width
          remainingWidth = Math.max(0, safeWidth - lineWidth)
          itemIndex++
          textCursor = null
          continue
        }

        case 'text': {
          if (textCursor !== null && cursorsMatch(textCursor, item.endCursor)) {
            itemIndex++
            textCursor = null
            continue
          }

          const leadingGap = fragments.length === 0 ? 0 : item.leadingGap
          const reservedWidth = leadingGap + item.chromeWidth
          if (fragments.length > 0 && reservedWidth >= remainingWidth) break lineLoop

          if (textCursor === null) {
            const fullWidth = leadingGap + item.fullWidth + item.chromeWidth
            if (fullWidth <= remainingWidth) {
              fragments.push({
                className: item.className,
                leadingGap,
                text: item.fullText,
              })
              lineWidth += fullWidth
              remainingWidth = Math.max(0, safeWidth - lineWidth)
              itemIndex++
              continue
            }
          }

          const startCursor = textCursor ?? LINE_START_CURSOR
          const line = layoutNextLine(
            item.prepared,
            startCursor,
            Math.max(1, remainingWidth - reservedWidth),
          )
          if (line === null) {
            itemIndex++
            textCursor = null
            continue
          }
          if (cursorsMatch(startCursor, line.end)) {
            itemIndex++
            textCursor = null
            continue
          }

          fragments.push({
            className: item.className,
            leadingGap,
            text: line.text,
          })
          lineWidth += leadingGap + line.width + item.chromeWidth
          remainingWidth = Math.max(0, safeWidth - lineWidth)

          if (cursorsMatch(line.end, item.endCursor)) {
            itemIndex++
            textCursor = null
            continue
          }

          textCursor = line.end
          break lineLoop
        }
      }
    }

    if (fragments.length === 0) break
    lines.push({ fragments })
  }

  return lines
}

function renderBody(lines: RichLine[]): void {
  domCache.noteBody.textContent = ''
  const fragment = document.createDocumentFragment()

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex]!
    const row = document.createElement('div')
    row.className = 'line-row'
    row.style.top = `${lineIndex * LINE_HEIGHT}px`

    for (let fragmentIndex = 0; fragmentIndex < line.fragments.length; fragmentIndex++) {
      const part = line.fragments[fragmentIndex]!
      const element = document.createElement('span')
      element.className = part.className
      element.textContent = part.text
      if (part.leadingGap > 0) element.style.marginLeft = `${part.leadingGap}px`
      row.appendChild(element)
    }

    fragment.appendChild(row)
  }

  domCache.noteBody.appendChild(fragment)
}

function render(): void {
  // DOM reads
  const viewportWidth = document.documentElement.clientWidth

  // Handle inputs
  let requestedWidth = st.requestedWidth
  if (st.events.sliderValue !== null) requestedWidth = st.events.sliderValue

  // Layout
  const maxBodyWidth = Math.max(
    BODY_MIN_WIDTH,
    Math.min(BODY_MAX_WIDTH, viewportWidth - PAGE_MARGIN * 2 - NOTE_SHELL_CHROME_X),
  )
  const bodyWidth = Math.max(BODY_MIN_WIDTH, Math.min(maxBodyWidth, requestedWidth))
  const lines = layoutInlineItems(items, bodyWidth)
  const lineCount = lines.length
  const noteWidth = bodyWidth + NOTE_SHELL_CHROME_X
  const noteBodyHeight =
    lineCount === 0 ? LAST_LINE_BLOCK_HEIGHT : (lineCount - 1) * LINE_HEIGHT + LAST_LINE_BLOCK_HEIGHT

  // Commit state
  st.requestedWidth = bodyWidth
  st.events.sliderValue = null

  // DOM writes
  domCache.widthSlider.min = String(BODY_MIN_WIDTH)
  domCache.widthSlider.max = String(maxBodyWidth)
  domCache.widthSlider.value = String(bodyWidth)
  domCache.widthValue.textContent = `${Math.round(bodyWidth)}px`
  domCache.root.style.setProperty('--note-width', `${noteWidth}px`)
  domCache.root.style.setProperty('--note-content-width', `${bodyWidth}px`)
  domCache.noteBody.style.height = `${noteBodyHeight}px`

  renderBody(lines)
}
