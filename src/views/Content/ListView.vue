<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useUserStore } from '@/stores/modules/userStore';
  import { getSubscribeSub } from '@/apis/modules/user';
  import { getListDetail } from '@/apis/modules/resource';
  import { FormatPlayCount, FormatDate } from '@/utils/common';

  import { Modal } from 'ant-design-vue';

  import SvgIcon from '@/components/SvgIcon.vue';
  import ButtonIcon from '@/components/ButtonIcon.vue';
  import TrackList from '@/components/TrackList.vue';

  const route = useRoute();

  const userStore = useUserStore();

  const id = ref();
  const playlist = ref();

  const open = ref<boolean>(false);

  const creator = computed(() => {
    return playlist.value?.creator.nickname;
  });

  const isLike = computed(() => {
    return playlist.value.subscribed;
  });

  const like = (value: number) => {
    playlist.value.subscribed = !playlist.value.subscribed;
    getSubscribeSub(id.value, value);
  };

  const showModal = () => {
    open.value = true;
  };

  onMounted(() => {
    id.value = route.query.id;
    getListDetail(id.value).then((Detail) => {
      playlist.value = Detail.playlist;
    });
  });
</script>

<template>
  <div class="playlist">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist?.coverImgUrl" />
      </div>
      <div class="info">
        <div class="title">{{ playlist?.name }}</div>
        <div class="artist">{{ creator }}</div>
        <div class="data-and-count"
          >更新于 {{ FormatDate(playlist?.updateTime) }} · {{ playlist?.trackCount }} 首歌</div
        >
        <div class="count"
          >播放 {{ FormatPlayCount(playlist?.playCount) }} 收藏
          {{ FormatPlayCount(playlist?.subscribedCount) }} 分享
          {{ FormatPlayCount(playlist?.shareCount) }}</div
        >
        <div class="description" @click="showModal">{{ playlist?.description }}</div>
        <div class="buttons" v-if="userStore.login && playlist.userId != userStore.userId">
          <ButtonIcon v-show="!isLike" @click="like(1)">
            <SvgIcon icon-class="heart"></SvgIcon>
            收藏
          </ButtonIcon>
          <ButtonIcon v-show="isLike" @click="like(0)">
            <SvgIcon icon-class="heart-solid"></SvgIcon>
            以收藏
          </ButtonIcon>
        </div>
      </div>
    </div>
  </div>
  <TrackList :playlist="playlist?.tracks"></TrackList>

  <Modal v-model:open="open" title="歌单简介" :width="1000" :footer="null" centered>{{
    playlist?.description
  }}</Modal>
</template>

<style lang="less" scoped>
  .playlist {
    .playlist-info {
      display: flex;
      margin-bottom: 30px;
      position: relative;

      .cover {
        flex: 2;

        img {
          width: 100%;
          border-radius: 0.75rem;
          user-select: none;
        }
      }

      .info {
        flex: 7;
        display: flex;
        flex-direction: column;
        color: var(--color-text);
        margin-left: 56px;

        .title {
          font-size: 36px;
          font-weight: 700;
        }

        .artist {
          font-size: 18px;
          opacity: 0.88;
          margin: 12px 0;
        }

        .data-and-count {
          font-size: 14px;
          opacity: 0.88;
        }

        .count {
          font-size: 14px;
          opacity: 0.88;
          margin: 12px 0;
        }

        .description {
          font-size: 14px;
          opacity: 0.88;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }

        .buttons {
          margin: 12px 0 0;

          .button-icon {
            font-size: 15px;
            padding: 8px 12px;
            border-radius: 8px;
            background-color: var(--color-hover-bg);
            user-select: none;

            .svg-icon {
              margin-right: 6px;
              color: var(--color-primary);
            }
          }
        }
      }
    }
  }
</style>
