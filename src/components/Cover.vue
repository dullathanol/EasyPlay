<script setup lang="ts">
  import { ref } from 'vue';
  import SvgIcon from '@/components/SvgIcon.vue';

  const props = defineProps(['src']);

  const focus = ref(false);
</script>

<template>
  <div class="cover" @mouseover="focus = true" @mouseleave="focus = false">
    <div class="shade">
      <button class="play-button" v-show="focus">
        <SvgIcon icon-class="play"></SvgIcon>
      </button>
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
      justify-content: center;
      align-items: center;

      .play-button {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        backdrop-filter: blur(8px);
        height: 45px;
        width: 45px;
        border-radius: 50%;
        transition: 0.2s;

        .svg-icon {
          width: 45%;
          height: 45%;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.28);
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
