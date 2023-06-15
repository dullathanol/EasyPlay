<script setup lang="ts">
  import { ref } from 'vue';
  import { getListDetail } from '@/apis/modules/resource';
  import { usePlayStore } from '@/stores/modules/playStore';
  import { addSong } from '@/hooks/Player';

  import SvgIcon from '@/components/SvgIcon.vue';
  import ButtonIcon from '@/components/ButtonIcon.vue';

  const props = defineProps(['src', 'item']);

  const playStore = usePlayStore();

  const focus = ref(false);

  const play = () => {
    getListDetail(props.item.id).then((list) => {
      playStore.songList = list.playlist.tracks;
      addSong(list.playlist.tracks[0].id, 0, true);
    });
  };
</script>

<template>
  <div class="cover" @mouseover="focus = true" @mouseleave="focus = false">
    <div class="shade">
      <ButtonIcon v-show="focus" @click.stop="play">
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
          width: 50%;
          height: 50%;
        }

        &:hover {
          background: var(--color-active-bg);
        }

        &:active {
          transform: scale(0.9);
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
