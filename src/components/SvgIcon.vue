<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps({
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  });

  const iconName = computed(() => {
    return `#icon-${props.iconClass}`;
  });

  const svgClass = computed(() => {
    if (props.className) {
      return 'svg-icon' + props.className;
    } else {
      return 'svg-icon';
    }
  });
</script>

<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<style lang="less" scoped>
  .svg-icon {
    height: 16px;
    width: 16px;
    fill: currentColor;
    color: var(--color-text);
  }
</style>
