<script setup lang="ts">
  import ArtistsName from '@/components/ArtistsName.vue';
  import SvgIcon from '@/components/SvgIcon.vue';
  import { FormatSongTime } from '@/utils/common';
  import { useUserStore } from '@/stores/modules/userStore';
  import { usePlayStore } from '@/stores/modules/playStore';
  import { Likelist } from '@/hooks/init';
  import { getLike } from '@/apis/modules/user';
  import { ref, computed } from 'vue';

  const props = defineProps(['playlist']);
  const userStore = useUserStore();
  const playStore = usePlayStore();

  const isLike = ref(false);

  Likelist(props.playlist.id).then((value) => {
    isLike.value = value;
  });

  const like = (value) => {
    isLike.value = !isLike.value;
    getLike(props.playlist.id, value);
  };

  const src = computed(() => {
    if (props.playlist?.picUrl) {
      return props.playlist.picUrl;
    }
    if (props.playlist?.al) {
      return props.playlist.al.picUrl;
    }
  });

  const artists = computed(() => {
    if (props.playlist?.ar) {
      return props.playlist.ar;
    }
    if (props.playlist?.song) {
      return props.playlist.song.artists;
    }
  });

  const album = computed(() => {
    if (props.playlist?.al) {
      return props.playlist.al;
    }
    if (props.playlist?.song) {
      return props.playlist.song.album;
    }
  });

  const time = computed(() => {
    if (props.playlist?.dt) {
      return FormatSongTime(props.playlist.dt);
    }
    if (props.playlist?.song) {
      return FormatSongTime(props.playlist.song.duration);
    }
  });
</script>

<template>
  <div class="track" :class="{ active: playStore.songId == playlist.id }">
    <img :src="src" />
    <div class="title-and-artist">
      <div class="container">
        <div class="title">
          {{ playlist.name }}
        </div>
        <div class="artist">
          <ArtistsName :artists="artists"></ArtistsName>
        </div>
      </div>
    </div>
    <div class="album">
      <router-link :to="{ name: 'album', query: { id: album?.id } }">{{ album?.name }}</router-link>
    </div>
    <div class="actions" v-if="userStore.login">
      <button>
        <SvgIcon v-show="!isLike" @click="like('true')" icon-class="heart"></SvgIcon>
        <SvgIcon v-show="isLike" @click="like('false')" icon-class="heart-solid"></SvgIcon>
      </button>
    </div>
    <div class="time">
      {{ time }}
    </div>
  </div>
</template>

<style lang="less" scoped>
  .track {
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding: 5px 14px;
    margin: 5px 0;
    color: var(--color-text);
    transition: 0.2s;
    user-select: none;

    &:hover {
      background: var(--color-hover-bg);
    }

    &:active {
      transform: scale(0.99);
    }

    &.active {
      background: var(--color-panel-bg);
    }

    img {
      width: 45px;
      height: 45px;
      border-radius: 8px;
      margin-right: 20px;
      cursor: pointer;
    }

    .title-and-artist {
      flex: 1;
      display: flex;

      .container {
        display: flex;
        flex-direction: column;

        .title {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          word-break: break-all;
        }

        .artist {
          margin-top: 3px;
          font-size: 13px;
          color: var(--color-text);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }
    }

    .album {
      flex: 1;
      font-size: 16px;
      opacity: 0.88;
      color: var(--color-text);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }

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

    .time {
      font-size: 16px;
      width: 50px;
      display: flex;
      justify-content: flex-end;
      margin-right: 10px;
      opacity: 0.88;
      color: var(--color-text);
    }
  }
</style>
