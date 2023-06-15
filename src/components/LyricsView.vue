<script setup lang="ts">
  import ButtonIcon from '@/components/ButtonIcon.vue';
  import ArtistsName from '@/components/ArtistsName.vue';
  import SvgIcon from '@/components/SvgIcon.vue';
  import VueSlider from 'vue-slider-component';
  import { startMusic, pauseMusic, playLast, playNext, changePlayMode, mute } from '@/hooks/Player';
  import { usePlayStore } from '@/stores/modules/playStore';
  import { useUserStore } from '@/stores/modules/userStore';
  import { FormatTrackTime } from '@/utils/common';
  import { ref, computed, watch } from 'vue';
  import { Likelist } from '@/hooks/init';
  import { getLikeSub } from '@/apis/modules/user';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const playStore = usePlayStore();
  const userStore = useUserStore();

  const isLike = ref(false);

  if (playStore.songList[playStore.currentIndex]?.id) {
    Likelist(playStore.songList[playStore.currentIndex].id).then((value) => {
      isLike.value = value;
    });
  }

  const like = (value) => {
    isLike.value = !isLike.value;
    getLikeSub(playStore.songList[playStore.currentIndex].id, value);
  };

  const go = () => {
    router.go(-1);
  };

  const title = computed(() => {
    if (playStore.playMode == 0) {
      return '顺序播放';
    }
    if (playStore.playMode == 1) {
      return '单曲循环';
    }
    if (playStore.playMode == 2) {
      return '随机播放';
    }
  });

  const src = computed(() => {
    if (playStore.songList[playStore.currentIndex]?.picUrl) {
      return playStore.songList[playStore.currentIndex].picUrl;
    }
    if (playStore.songList[playStore.currentIndex]?.al) {
      return playStore.songList[playStore.currentIndex].al.picUrl;
    }
    if (playStore.songList[playStore.currentIndex]?.album) {
      return playStore.songList[playStore.currentIndex].album.picUrl;
    }
  });

  const name = computed(() => {
    if (playStore.songList[playStore.currentIndex]?.name) {
      return playStore.songList[playStore.currentIndex].name;
    }
  });

  const artists = computed(() => {
    if (playStore.songList[playStore.currentIndex]?.ar) {
      return playStore.songList[playStore.currentIndex].ar;
    }
    if (playStore.songList[playStore.currentIndex]?.artists) {
      return playStore.songList[playStore.currentIndex].artists;
    }
    if (playStore.songList[playStore.currentIndex]?.song.artists) {
      return playStore.songList[playStore.currentIndex].song.artists;
    }
  });

  const progress = computed({
    get() {
      return playStore.progress;
    },
    set(value) {
      playStore.Howl.seek(value);
    },
  });

  watch(
    () => playStore.songList[playStore.currentIndex]?.id,
    () => {
      if (playStore.songList[playStore.currentIndex]?.id) {
        Likelist(playStore.songList[playStore.currentIndex].id).then((value) => {
          isLike.value = value;
        });
      }
    },
  );
</script>

<template>
  <div class="lyrics-page">
    <div class="cover">
      <img :src="src" />
    </div>
    <div class="controls">
      <div class="track-info">
        <div class="title">
          {{ name }}
        </div>
        <ArtistsName :artists="artists"></ArtistsName>
        <div class="subtitle">
          <ButtonIcon v-if="userStore.login && playStore.songList[playStore.currentIndex]">
            <SvgIcon v-show="!isLike" @click="like('true')" icon-class="heart"></SvgIcon>
            <SvgIcon v-show="isLike" @click="like('false')" icon-class="heart-solid"></SvgIcon>
          </ButtonIcon>
        </div>
      </div>
      <div class="progress-bar">
        <span>{{ FormatTrackTime(progress) || '0:00' }}</span>
        <div class="slider">
          <VueSlider
            v-model="progress"
            :min="0"
            :max="playStore.time"
            :interval="1"
            :drag-on-click="true"
            :duration="0"
            :dot-size="12"
            :height="2"
            :tooltip-formatter="FormatTrackTime"
            :silent="true"
          >
          </VueSlider>
        </div>
        <span>{{ FormatTrackTime(playStore.time) }}</span>
      </div>
      <div class="media-controls">
        <ButtonIcon :title="title" @click="changePlayMode">
          <SvgIcon v-show="playStore.playMode == 0" icon-class="repeat"></SvgIcon>
          <SvgIcon v-show="playStore.playMode == 1" icon-class="repeat-1"></SvgIcon>
          <SvgIcon v-show="playStore.playMode == 2" icon-class="shuffle"></SvgIcon>
        </ButtonIcon>
        <div class="middle">
          <ButtonIcon title="上一首" @click="playLast">
            <SvgIcon icon-class="previous"></SvgIcon>
          </ButtonIcon>
          <ButtonIcon :title="playStore.playing ? '暂停' : '播放'" class="play">
            <SvgIcon v-show="!playStore.playing" icon-class="play" @click="startMusic"></SvgIcon>
            <SvgIcon v-show="playStore.playing" icon-class="pause" @click="pauseMusic"></SvgIcon>
          </ButtonIcon>
          <ButtonIcon title="下一首" @click="playNext">
            <SvgIcon icon-class="next"></SvgIcon>
          </ButtonIcon>
        </div>
        <ButtonIcon title="静音" @click="mute">
          <SvgIcon v-show="playStore.volume > 0.5" icon-class="volume"></SvgIcon>
          <SvgIcon v-show="playStore.volume == 0" icon-class="volume-mute"></SvgIcon>
          <SvgIcon
            v-show="playStore.volume <= 0.5 && playStore.volume != 0"
            icon-class="volume-half"
          >
          </SvgIcon>
        </ButtonIcon>
      </div>
    </div>
    <div class="close" @click="go">
      <ButtonIcon>
        <SvgIcon icon-class="arrow-down"></SvgIcon>
      </ButtonIcon>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .lyrics-page {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: var(--color-body-bg);

    .cover {
      width: 28vw;

      img {
        width: 100%;
        border-radius: 0.75rem;
      }
    }

    .controls {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: var(--color-text);
      margin: 15px 0;

      .track-info {
        width: 28vw;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
          font-size: 1.5rem;
          font-weight: 600;
          opacity: 0.88;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }

        .subtitle {
          opacity: 0.88;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }

      .progress-bar {
        width: 28vw;
        margin: 15px 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .slider {
          flex: 1;
          padding: 0 10px;
        }
      }

      .media-controls {
        display: flex;
        align-items: center;
        justify-content: center;

        .middle {
          margin: 0 15px;
          display: flex;
          align-items: center;
          justify-content: center;

          .svg-icon {
            opacity: 0.88;
            width: 25px;
            height: 25px;
          }
        }
      }
    }

    .close {
      .svg-icon {
        opacity: 0.88;
        width: 25px;
        height: 25px;
      }
    }
  }
</style>
