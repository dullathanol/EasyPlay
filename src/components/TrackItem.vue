<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { getLikeSub } from '@/apis/modules/user';
  import { useUserStore } from '@/stores/modules/userStore';
  import { usePlayStore } from '@/stores/modules/playStore';
  import { FormatSongTime } from '@/utils/common';

  import SvgIcon from '@/components/SvgIcon.vue';
  import ButtonIcon from './ButtonIcon.vue';
  import ArtistsName from '@/components/ArtistsName.vue';

  const props = defineProps(['playlist']);

  const userStore = useUserStore();
  const playStore = usePlayStore();

  const isLike = ref(false);

  const like = (value: string) => {
    isLike.value = !isLike.value;
    getLikeSub(props.playlist.id, value);
  };

  const src = computed(() => {
    if (props.playlist?.picUrl) {
      return props.playlist.picUrl;
    }
    if (props.playlist?.al) {
      return props.playlist.al.picUrl;
    }
    return '';
  });

  const artists = computed(() => {
    if (props.playlist?.ar) {
      return props.playlist.ar;
    }
    if (props.playlist?.song) {
      return props.playlist.song.artists;
    }
    return [];
  });

  const album = computed(() => {
    if (props.playlist?.al) {
      return props.playlist.al;
    }
    if (props.playlist?.song) {
      return props.playlist.song.album;
    }
    return [];
  });

  const time = computed(() => {
    if (props.playlist?.dt) {
      return FormatSongTime(props.playlist.dt);
    }
    if (props.playlist?.song) {
      return FormatSongTime(props.playlist.song.duration);
    }
    return '';
  });
</script>

<template>
  <div class="track" :class="{ active: playStore.songId == playlist.id }">
    <img :src="src" />
    <div class="title-and-artist">
      <div class="title">
        {{ playlist.name }}
      </div>
      <div class="artist">
        <ArtistsName :artists="artists"></ArtistsName>
      </div>
    </div>
    <div class="album">
      <router-link :to="{ name: 'album', query: { id: album.id } }">{{ album.name }}</router-link>
    </div>
    <div class="actions" v-if="userStore.login">
      <ButtonIcon>
        <SvgIcon v-if="!isLike" @click.stop="like('true')" icon-class="heart"></SvgIcon>
        <SvgIcon v-else @click.stop="like('false')" icon-class="heart-solid"></SvgIcon>
      </ButtonIcon>
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
    padding: 6px 12px;
    margin: 5px 0;
    border-radius: 8px;
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
      border-radius: 5px;
      margin-right: 20px;
    }

    .title-and-artist {
      flex: 1;
      display: flex;
      flex-direction: column;

      .title {
        font-size: 16px;
        font-weight: 600;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-all;
        overflow: hidden;
      }

      .artist {
        margin-top: 3px;
        font-size: 13px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-all;
        overflow: hidden;
      }
    }

    .album {
      flex: 1;
      font-size: 16px;
      opacity: 0.88;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      word-break: break-all;
      overflow: hidden;
    }

    .actions {
      .button-icon {
        background: transparent;

        .svg-icon {
          height: 16px;
          width: 16px;
          color: var(--color-primary);
        }
      }
    }

    .time {
      width: 50px;
      display: flex;
      justify-content: flex-end;
      font-size: 16px;
      opacity: 0.88;
    }
  }
</style>
