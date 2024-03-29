<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useUserStore } from '@/stores/modules/userStore';
  import { getAlbumSub } from '@/apis/modules/user';
  import { getAlbumDetail } from '@/apis/modules/resource';
  import { FormatDate } from '@/utils/common';

  import ArtistsName from '@/components/ArtistsName.vue';
  import TrackList from '@/components/TrackList.vue';
  import SvgIcon from '@/components/SvgIcon.vue';

  const route = useRoute();
  const userStore = useUserStore();

  const isLike = ref(false);
  const id = ref();
  const album = ref();
  const songs = ref();

  const like = (value: number) => {
    isLike.value = !isLike.value;
    getAlbumSub(id.value, value);
  };

  onMounted(() => {
    id.value = route.query.id;

    getAlbumDetail(id.value).then((Album) => {
      album.value = Album.album;
      songs.value = Album.songs;
    });
  });
</script>

<template>
  <div class="album-page">
    <div class="album-info">
      <div class="left">
        <img :src="album.picUrl" />
      </div>
      <div class="right">
        <div class="name">{{ album.name }}</div>
        <div class="artist">
          <ArtistsName :artists="album.artists"></ArtistsName>
        </div>
        <div class="data-and-count"
          >更新于 {{ FormatDate(album.publishTime) }} · {{ songs.length }} 首歌</div
        >
        <div class="description">{{ album.description }}</div>
        <div class="buttons" v-if="userStore.login">
          <button v-show="!isLike" @click="like(1)">
            <SvgIcon icon-class="heart"></SvgIcon>
            收藏
          </button>
          <button v-show="isLike" @click="like(0)">
            <SvgIcon icon-class="heart-solid"></SvgIcon>
            以收藏
          </button>
        </div>
      </div>
    </div>
    <div class="Tracks">
      <div class="section-title">专辑列表</div>
      <TrackList :playlist="songs"></TrackList>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .album-page {
    .album-info {
      display: flex;
      align-items: center;
      margin-bottom: 26px;
      color: var(--color-text);

      .left {
        flex: 2;

        img {
          width: 100%;
          border-radius: 10px;
        }
      }

      .right {
        flex: 7;
        margin-left: 56px;

        .name {
          font-size: 36px;
          font-weight: 700;
        }

        .artist {
          font-size: 16px;
          opacity: 0.88;
          margin: 12px 0;
        }

        .data-and-count {
          font-size: 14px;
          opacity: 0.88;
          color: var(--color-text);
        }

        .description {
          font-size: 14px;
          opacity: 0.88;
          margin: 12px 0;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }

        .buttons {
          button {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            padding: 8px 12px;
            border-radius: 8px;
            color: var(--color-text);
            background-color: var(--color-panel-bg);
            user-select: none;
            transition: 0.2s;

            &:hover {
              transform: scale(1.06);
            }

            &:active {
              transform: scale(0.94);
            }

            .svg-icon {
              margin-right: 6px;
              color: var(--color-primary);
            }
          }
        }
      }
    }

    .Tracks {
      .section-title {
        font-size: 24px;
        font-weight: 600;
        opacity: 0.88;
        margin-bottom: 16px;
        color: var(--color-text);
      }
    }
  }
</style>
