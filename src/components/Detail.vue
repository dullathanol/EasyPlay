<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon.vue';
  import { useDetailStore } from '@/stores/modules/detailStore';

  const props = defineProps(['detail']);
  const detailStore = useDetailStore();

  const close = () => {
    detailStore.showFullDescription = false;
  };
</script>

<template>
  <div class="shade" @click="close">
    <div class="model" @click.stop>
      <div class="header">
        <div class="title">{{ detail }}</div>
        <button @click="close">
          <SvgIcon icon-class="x"></SvgIcon>
        </button>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .shade {
    color: var(--color-text);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;

    .model {
      width: 50vw;
      padding: 24px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      border-radius: 12px;
      background: rgba(36, 36, 36);
      border: 1px solid rgba(255, 255, 255, 0.08);

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .title {
          font-weight: 600;
          font-size: 20px;
        }

        button {
          height: 30px;
          width: 30px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.2s;

          &:hover {
            background: var(--color-hover-bg);
          }

          .svg-icon {
            height: 18px;
            width: 18px;
          }
        }
      }
    }
  }
</style>
