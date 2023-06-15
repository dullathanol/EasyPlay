<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { usePlayStore } from '@/stores/modules/playStore';
  import { getFM, getFMTrash } from '@/apis/modules/resource';
  import { addSong } from '@/hooks/Player';

  import ArtistsName from '@/components/ArtistsName.vue';
  import SvgIcon from '@/components/SvgIcon.vue';
  import ButtonIcon from '@/components/ButtonIcon.vue';

  const playStore = usePlayStore();

  const index = ref(0);
  const fm = ref<any[]>([]);

  const play = () => {
    playStore.songList = fm.value;
    addSong(fm.value[index.value].id, 0, true);
  };

  const next = () => {
    getFM().then((FM) => {
      fm.value = FM.data;
      playStore.songList = fm.value;
      addSong(fm.value[index.value].id, 0, true);
    });
  };

  const moveToFM = async () => {
    getFMTrash(fm.value[index.value].id);
  };

  const cover = computed(() => {
    return fm.value[index.value]?.album.picUrl;
  });

  const name = computed(() => {
    return fm.value[index.value]?.name;
  });

  const artists = computed(() => {
    return fm.value[index.value]?.artists;
  });

  onMounted(() => {
    getFM().then((FM) => {
      fm.value = FM.data;
    });
  });
</script>

<template>
  <div class="fm">
    <img class="cover" :src="cover" @click="play" />
    <div class="right-part">
      <div class="info">
        <div class="title">{{ name }}</div>
        <div class="artist">
          <ArtistsName :artists="artists"></ArtistsName>
        </div>
      </div>
      <div class="controls">
        <div class="buttons">
          <ButtonIcon title="不喜欢" @click="moveToFM">
            <SvgIcon icon-class="thumbs-down"></SvgIcon>
          </ButtonIcon>
          <ButtonIcon title="播放" @click="play">
            <SvgIcon icon-class="play"></SvgIcon>
          </ButtonIcon>
          <ButtonIcon title="下一页" @click="next">
            <SvgIcon icon-class="next"></SvgIcon>
          </ButtonIcon>
        </div>
        <div class="card-name">
          <SvgIcon icon-class="fm"></SvgIcon>
          私人FM
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .fm {
    height: 200px;
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    box-sizing: border-box;
    background: var(--color-hover-bg);

    .cover {
      height: 100%;
      border-radius: 0.75rem;
    }

    .right-part {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 16px;
      color: var(--color-text);

      .title {
        font-size: 1.6rem;
        font-weight: 600;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
        overflow: hidden;
      }

      .artist {
        margin: 10px 0;
      }

      .controls {
        display: flex;
        align-items: baseline;
        justify-content: space-between;

        .buttons {
          display: flex;
          align-items: center;

          .button-icon {
            margin-right: 8px;

            .svg-icon {
              width: 24px;
              height: 24px;
            }
          }
        }

        .card-name {
          font-size: 1rem;
          opacity: 0.18;
          display: flex;
          align-items: center;
          font-weight: 600;
          user-select: none;

          .svg-icon {
            width: 18px;
            height: 18px;
            margin-right: 6px;
          }
        }
      }
    }
  }
</style>
