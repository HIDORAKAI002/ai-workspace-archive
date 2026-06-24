<script lang="ts" setup>
interface Props {
  record: Record<string, string>
  color?: string
  resize?: boolean
  selected?: boolean
  hover?: boolean
  dragging?: boolean
  // When true, stack visible fields over multiple lines filling the card height
  // (DateTime week view) instead of clamping to a single truncated line.
  multiline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  resize: true,
  selected: false,
  hover: false,
  color: 'gray',
  dragging: false,
  multiline: false,
})

const emit = defineEmits(['resizeStart'])

const rowColorInfo = computed(() => {
  return extractRowBackgroundColorStyle(props.record as Row)
})
</script>

<template>
  <div
    :style="{
      boxShadow:
        hover || dragging
          ? '0px 12px 16px -4px rgba(0, 0, 0, 0.10), 0px 4px 6px -2px rgba(0, 0, 0, 0.06)'
          : '0px 2px 4px -2px rgba(0, 0, 0, 0.06), 0px 4px 4px -2px rgba(0, 0, 0, 0.02)',

      ...rowColorInfo.rowBgColor,
    }"
    :class="{
      'bg-nc-maroon-50': props.color === 'maroon',
      'bg-nc-blue-50': props.color === 'blue',
      'bg-nc-green-50': props.color === 'green',
      'bg-nc-yellow-50': props.color === 'yellow',
      'bg-nc-pink-50': props.color === 'pink',
      'bg-nc-purple-50': props.color === 'purple',
      'bg-nc-bg-default border-nc-border-gray-dark': color === 'gray',
      'z-90': hover,
      '!bg-nc-bg-gray-light': hover || dragging,
    }"
    class="relative flex-none flex gap-1 border-1 rounded-md h-full overflow-hidden"
  >
    <div
      v-if="resize"
      class="absolute w-full h-1 z-20 top-0 cursor-row-resize"
      @mousedown.stop="emit('resizeStart', 'left', $event, record)"
    ></div>
    <div
      :class="{
        'bg-nc-maroon-500': props.color === 'maroon',
        'bg-nc-blue-500': props.color === 'blue',
        'bg-nc-green-500': props.color === 'green',
        'bg-nc-yellow-500': props.color === 'yellow',
        'bg-nc-pink-500': props.color === 'pink',
        'bg-nc-purple-500': props.color === 'purple',
        'bg-nc-gray-900': props.color === 'gray',
      }"
      class="h-full min-h-3 w-1.25 -ml-0.25"
      :style="rowColorInfo.rowLeftBorderColor"
    ></div>

    <div
      class="flex pt-1 w-full flex-col gap-1 overflow-hidden h-full"
      :class="{ 'overflow-x-hidden whitespace-nowrap text-ellipsis truncate': !multiline }"
    >
      <NcTooltip
        wrap-child="div"
        :disabled="selected || dragging"
        overlay-class-name="nc-record-fields-tooltip"
        show-on-truncate-only
        :class="
          multiline
            ? 'nc-calendar-vcard-fields flex flex-col gap-0.5 w-full overflow-hidden flex-1 min-h-0'
            : 'nc-calendar-vcard-inline truncate w-full overflow-hidden'
        "
      >
        <template #title>
          <slot name="tooltip">
            <slot />
          </slot>
        </template>
        <slot />
      </NcTooltip>

      <div class="flex-shrink-0">
        <slot name="time" />
      </div>
    </div>
    <div
      v-if="resize"
      class="absolute cursor-row-resize w-full bottom-0 w-full h-1"
      @mousedown.stop="emit('resizeStart', 'right', $event, record)"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.cursor-row-resize {
  cursor: ns-resize;
}

.plain-cell {
  line-height: 18px;
  .bold {
    @apply !text-nc-content-gray font-bold;
  }
}

// In multiline mode each visible field is its own clean truncated line:
// drop the inline "•" separators, emphasise the lead field, mute the rest.
.nc-calendar-vcard-fields :deep(.plain-cell) {
  // shrink-0: keep each field at its natural line height so a short (duration-
  // sized) card clips cleanly to the first field(s) instead of squashing every
  // field to an invisible sliver.
  @apply truncate w-full leading-5 text-bodySm text-nc-content-gray-subtle flex-shrink-0;

  &::before {
    content: '' !important;
    padding: 0 !important;
  }
}

.nc-calendar-vcard-fields :deep(.plain-cell:first-child) {
  @apply text-nc-content-gray font-semibold;
}
</style>
