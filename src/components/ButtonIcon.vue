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
    border: none;
    margin: 4px;
    padding: 8px;
    border-radius: 20%;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      background: var(--color-hover-bg);
    }

    &:active {
      transform: scale(0.9);
    }
  }
</style>
