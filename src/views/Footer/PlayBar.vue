<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { usePlayStore } from '@/stores/modules/playStore';
  import { useUserStore } from '@/stores/modules/userStore';
  import { getLike } from '@/apis/modules/user';
  import { startMusic, pauseMusic, playLast, playNext, changePlayMode, mute } from '@/hooks/Player';
  import { FormatTrackTime } from '@/utils/common';

  import SvgIcon from '@/components/SvgIcon.vue';
  import ButtonIcon from '@/components/ButtonIcon.vue';
  import ArtistsName from '@/components/ArtistsName.vue';
  import VueSlider from 'vue-slider-component';

  import '@/styles/slider.css';

  const route = useRoute();
  const router = useRouter();
  const playStore = usePlayStore();
  const userStore = useUserStore();

  const isLike = ref(false);

  const like = (value: string) => {
    isLike.value = !isLike.value;
    getLike(playStore.songId, value);
  };

  const progress = computed({
    get() {
      return playStore.progress;
    },
    set(value) {
      playStore.Howl.seek(value);
    },
  });

  const volume = computed({
    get() {
      return playStore.volume;
    },
    set(value) {
      playStore.volume = value;
      if (playStore.Howl) {
        playStore.Howl.volume(value);
      }
    },
  });

  const track = () => {
    if (route.name == 'track') {
      router.go(-1);
    } else {
      router.push({ name: 'track' });
    }
  };

  const lyrics = () => {
    if (route.name == 'lyrics') {
      router.go(-1);
    } else {
      router.push({ name: 'lyrics' });
    }
  };
</script>

<template>
  <div class="play-bar">
    <div class="progress-bar" v-if="playStore.Howl">
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
      ></VueSlider>
    </div>
    <div class="controls">
      <div class="left-info">
        <div class="container" v-if="playStore.Howl">
          <img :src="playStore.src" />
          <div class="song-info">
            <div class="name">{{ playStore.name }}</div>
            <div class="artist">
              <ArtistsName :artists="playStore.artists"></ArtistsName>
            </div>
          </div>
          <div class="like-button">
            <ButtonIcon v-if="userStore.login && playStore.songList[playStore.currentIndex]">
              <SvgIcon v-if="!isLike" @click="like('true')" icon-class="heart"></SvgIcon>
              <SvgIcon v-else @click="like('false')" icon-class="heart-solid"></SvgIcon>
            </ButtonIcon>
          </div>
        </div>
      </div>
      <div class="middle-control">
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
      <div class="right-control">
        <ButtonIcon title="播放列表" @click="track">
          <SvgIcon icon-class="list"></SvgIcon>
        </ButtonIcon>
        <ButtonIcon :title="playStore.title" @click="changePlayMode">
          <SvgIcon v-show="playStore.playMode == 0" icon-class="repeat"></SvgIcon>
          <SvgIcon v-show="playStore.playMode == 1" icon-class="repeat-1"></SvgIcon>
          <SvgIcon v-show="playStore.playMode == 2" icon-class="shuffle"></SvgIcon>
        </ButtonIcon>
        <div class="volume-control">
          <ButtonIcon title="静音" @click="mute">
            <SvgIcon v-show="playStore.volume > 0.5" icon-class="volume"></SvgIcon>
            <SvgIcon v-show="playStore.volume == 0" icon-class="volume-mute"></SvgIcon>
            <SvgIcon
              v-show="playStore.volume <= 0.5 && playStore.volume != 0"
              icon-class="volume-half"
            >
            </SvgIcon>
          </ButtonIcon>
          <div class="volume-bar">
            <VueSlider
              v-model="volume"
              :min="0"
              :max="1"
              :interval="0.01"
              :drag-on-click="true"
              :duration="0"
              tooltip="none"
              :dot-size="12"
              :silent="true"
            ></VueSlider>
          </div>
        </div>
        <ButtonIcon title="歌词" @click="lyrics">
          <SvgIcon icon-class="arrow-up"></SvgIcon>
        </ButtonIcon>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .play-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 64px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 100;
    background: var(--color-navbar-bg);
    backdrop-filter: saturate(180%) blur(30px);

    .progress-bar {
      width: 100%;
      cursor: pointer;
    }

    .controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10vw;
      height: 100%;

      .left-info {
        flex: 2;

        .container {
          display: flex;
          align-items: center;

          img {
            width: 45px;
            border-radius: 5px;
            cursor: pointer;
          }

          .song-info {
            margin-left: 12px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            color: var(--color-text);

            .name {
              font-weight: 600;
              font-size: 16px;
              opacity: 0.88;
              margin-bottom: 2px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              word-break: break-all;
              overflow: hidden;
            }

            .artist {
              font-size: 12px;
              opacity: 0.58;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              word-break: break-all;
              overflow: hidden;
            }
          }

          .like-button {
            margin-left: 12px;
          }
        }
      }

      .middle-control {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        .play {
          height: 42px;
          width: 42px;

          .svg-icon {
            width: 24px;
            height: 24px;
          }
        }
      }

      .right-control {
        flex: 2;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .volume-control {
          display: flex;
          align-items: center;

          .volume-bar {
            width: 84px;
            margin: 0 4px;
          }
        }
      }
    }
  }
</style>
