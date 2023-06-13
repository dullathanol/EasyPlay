<script setup lang="ts">
  import { ref } from 'vue';
  import SvgIcon from '@/components/SvgIcon.vue';
  import ButtonIcon from './ButtonIcon.vue';

  defineProps(['src']);

  const focus = ref(false);
</script>

<template>
  <div class="cover" @mouseover="focus = true" @mouseleave="focus = false">
    <div class="shade">
      <ButtonIcon v-show="focus">
        <SvgIcon icon-class="play"></SvgIcon>
      </ButtonIcon>
    </div>
    <img :src="src" />
  </div>
</template>

<style lang="less" scoped>
  .cover {
    position: relative;
    cursor: pointer;

    .shade {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .button-icon {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        backdrop-filter: blur(5px);
        transition: 0.2s;

        .svg-icon {
          width: 45%;
          height: 45%;
        }

        &:hover {
          background: var(--color-active-bg);
        }

        &:active {
          transform: scale(0.94);
        }
      }
    }

    img {
      width: 100%;
      border-radius: 0.75rem;
      user-select: none;
    }
  }
</style>
