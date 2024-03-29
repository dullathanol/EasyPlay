<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { getMvSub } from '@/apis/modules/user';
  import { useUserStore } from '@/stores/modules/userStore';
  import { useVideoStore } from '@/stores/modules/videoStore';
  import { play, getVideo } from '@/hooks/Video';
  import { FormatPlayCount } from '@/utils/common';

  import ArtistsName from '@/components/ArtistsName.vue';
  import SvgIcon from '@/components/SvgIcon.vue';
  import ListCover from '@/components/ListCover.vue';

  import 'plyr/dist/plyr.css';

  const route = useRoute();
  const userStore = useUserStore();
  const videoStore = useVideoStore();

  const id = ref();
  const isLike = ref(false);

  const like = (value: number) => {
    isLike.value = !isLike.value;
    getMvSub(id.value, value);
  };

  onMounted(() => {
    id.value = route.query.id;

    getVideo(id.value);

    play();
  });
</script>

<template>
  <div class="mv-page">
    <div class="current-video">
      <div class="video">
        <video id="player" class="plyr" playsinline controls></video>
      </div>
      <div class="video-info">
        <div class="title">
          {{ videoStore.detail.name }}
          <div class="actions" v-if="userStore.login">
            <button>
              <SvgIcon v-show="!isLike" @click="like(1)" icon-class="heart"></SvgIcon>
              <SvgIcon v-show="isLike" @click="like(0)" icon-class="heart-solid"></SvgIcon>
            </button>
          </div>
        </div>
        <div class="artists">
          <ArtistsName :artists="videoStore.detail.artists"></ArtistsName>
        </div>
        <div class="info">
          <div class="time">
            <SvgIcon icon-class="time"></SvgIcon>
            {{ videoStore.detail.publishTime }}
          </div>
          <div class="play-count">
            <SvgIcon icon-class="play-circle"></SvgIcon>
            {{ FormatPlayCount(videoStore.detail.playCount) }}
          </div>
        </div>
      </div>
    </div>
    <div class="more-video">
      <div class="section-title">更多推荐</div>
      <ListCover class="mv-row" :list="videoStore.simi" :type="'mvs'"></ListCover>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .mv-page {
    .current-video {
      width: 65%;
      position: fixed;

      .video {
        border-radius: 16px;
        overflow: hidden;
        max-height: 100vh;
        margin: 0 auto;
        background: transparent;
        --plyr-color-main: var(--color-primary);
        --plyr-control-radius: 8px;
      }

      .video-info {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;
        color: var(--color-text);

        .title {
          font-size: 20px;
          font-weight: 600;
          display: flex;
          align-items: center;

          .actions {
            button {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 8px;
              background: transparent;
              border-radius: 25%;
              transition: transform 0.2s;

              .svg-icon {
                height: 16px;
                width: 16px;
                color: var(--color-primary);
              }

              &:hover {
                transform: scale(1.12);
              }

              &:active {
                transform: scale(0.96);
              }
            }
          }
        }

        .artists {
          font-size: 14px;
          opacity: 0.88;
          margin: 12px 0;
          font-weight: 600;
        }

        .info {
          font-size: 12px;
          opacity: 0.88;
          display: flex;
          align-items: center;

          .time {
            display: flex;
            align-items: center;
            margin-right: 12px;
          }

          .play-count {
            display: flex;
            align-items: center;
          }

          .svg-icon {
            height: 15px;
            width: 15px;
            margin-right: 3px;
          }
        }
      }
    }

    .more-video {
      margin-left: 85%;

      .section-title {
        font-size: 24px;
        font-weight: 600;
        color: var(--color-text);
        margin-bottom: 12px;
      }

      .mv-row {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
</style>
