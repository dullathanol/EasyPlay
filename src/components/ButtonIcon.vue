<template>
  <button class="button-icon">
    <slot></slot>
  </button>
</template>

<style lang="less" scoped>
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    margin: 4px;
    padding: 8px;
    border-radius: 25%;
    transition: 0.2s;

    &:hover {
      background: var(--color-hover-bg);
    }

    &:active {
      transform: scale(0.92);
    }
  }
</style>
