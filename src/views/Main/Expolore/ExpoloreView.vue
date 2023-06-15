<script setup lang="ts"></script>

<template>
  <div class="expolore">
    <div class="navigation-links">
      <router-link
        to="/expolore/playlist"
        :class="{ active: !$route.path.indexOf('/expolore/playlist') }"
        >音乐</router-link
      >
      <router-link
        to="/expolore/mvlist"
        :class="{ active: !$route.path.indexOf('/expolore/mvlist') }"
        >视频</router-link
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
  .expolore {
    .navigation-links {
      display: flex;
      justify-content: center;
      user-select: none;

      a {
        font-size: 16px;
        font-weight: 700;
        border-radius: 6px;
        padding: 6px 10px;
        margin: 0 5px;
        color: var(--color-text);
        transition: 0.2s;

        &:hover {
          background: var(--color-hover-bg);
        }

        &:active {
          transform: scale(0.92);
          transition: 0.2s;
        }

        &.active {
          color: var(--color-primary);
        }
      }
    }
  }
</style>
