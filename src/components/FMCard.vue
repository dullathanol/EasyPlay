<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { getFM, getTrash } from '@/apis/modules/user';
  import { usePlayStore } from '@/stores/modules/playStore';
  import { addSong, startMusic, pauseMusic } from '@/hooks/Player';
  import ArtistsName from '@/components/ArtistsName.vue';
  import ButtonIcon from '@/components/ButtonIcon.vue';
  import SvgIcon from '@/components/SvgIcon.vue';

  const playStore = usePlayStore();

  const fm = ref([{}]);

  getFM().then((FM) => {
    fm.value = FM.data;
  });

  const cover = computed(() => {
    return fm.value[0]?.album?.picUrl;
  });

  const name = computed(() => {
    return fm.value[0]?.name;
  });

  const artists = computed(() => {
    return fm.value[0]?.artists;
  });

  const moveToFM = async () => {
    getTrash(fm.value[0].id);
  };

  const play = () => {
    playStore.songList = fm.value;
    addSong(fm.value[0].id, 0, true);
  };

  const next = () => {
    getFM().then((FM) => {
      fm.value = FM.data;
      playStore.songList = fm.value;
      addSong(fm.value[0].id, 0, true);
    });
  };
</script>

<template>
  <div class="fm">
    <img class="cover" :src="cover" />
    <div class="right-part">
      <div class="info">
        <div class="title">{{ name }}</div>
        <div class="artist">
          <ArtistsName :artists="artists"></ArtistsName>
        </div>
      </div>
      <div class="controls">
        <div class="buttons">
          <ButtonIcon title="不喜欢" @click.native="moveToFM">
            <SvgIcon icon-class="thumbs-down"></SvgIcon>
          </ButtonIcon>
          <ButtonIcon title="播放" @click="play">
            <SvgIcon icon-class="play"></SvgIcon>
          </ButtonIcon>
          <ButtonIcon title="下一页" @click.native="next">
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
    background: var(--color-hover-bg);
    border-radius: 1rem;
    display: flex;
    box-sizing: border-box;

    .cover {
      height: 100%;
      //裁剪
      clip-path: border-box;
      border-radius: 0.75rem;
      margin-right: 1.2rem;
      user-select: none;
      cursor: pointer;
    }

    .right-part {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: var(--color-text);

      .title {
        font-size: 1.6rem;
        font-weight: 600;
        //弹性伸缩盒子模型
        display: -webkit-box;
        //伸缩盒子对象的子元素的排列方式
        -webkit-box-orient: vertical;
        //块元素包含的文本行数
        -webkit-line-clamp: 2;
        overflow: hidden;
        //任意字符间断行
        word-break: break-all;
      }

      .artist {
        margin-top: 10px;
      }

      .controls {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        .buttons {
          display: flex;

          .button-icon {
            margin: 0 8px 0 0;

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
