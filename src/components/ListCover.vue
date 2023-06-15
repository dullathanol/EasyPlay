<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { FormatPlayCount, FormatSongTime } from '@/utils/common';

  import CoverImg from '@/components/CoverImg.vue';
  import SvgIcon from '@/components/SvgIcon.vue';
  import ArtistsName from '@/components/ArtistsName.vue';

  const router = useRouter();
  const props = defineProps(['list', 'type']);

  const to = (item: any) => {
    if (props.type === 'albums') {
      router.push({
        name: 'album',
        query: { id: item.id },
      });
    }
    if (props.type === 'artists') {
      router.push({
        name: 'artist',
        query: { id: item.id },
      });
    }

    if (props.type === 'userprofiles') {
      router.push({
        name: 'user',
        query: { id: item.userId },
      });
    }
    if (props.type === 'submv') {
      router.push({
        name: 'mv',
        query: { id: item.vid },
      });
    }
    if (props.type === 'mvs' || props.type === 'artistmv') {
      router.push({
        name: 'mv',
        query: { id: item.id },
      });
    }
    if (props.type === 'playlist' || props.type === 'playlists' || props.type === 'rank') {
      router.push({
        name: 'list',
        query: { id: item.id },
      });
    }
  };

  const src = (item: any) => {
    if (props.type === 'userprofiles') {
      return item.avatarUrl;
    }
    if (props.type === 'mvs') {
      return item.cover;
    }
    if (props.type === 'submv') {
      return item.coverUrl;
    }
    if (props.type === 'artistmv') {
      return item.imgurl;
    }
    if (props.type === 'playlists' || props.type === 'rank') {
      return item.coverImgUrl;
    }
    if (props.type === 'albums' || props.type === 'artists' || props.type === 'playlist') {
      return item.picUrl;
    }
  };

  const playCount = (item: any) => {
    if (props.type === 'playlists' || props.type === 'mvs') {
      return FormatPlayCount(item.playCount);
    }
    return null;
  };

  const playTime = (item: any) => {
    if (props.type === 'mvs') {
      if (item.duration !== 0) {
        return FormatSongTime(item.duration);
      }
    }
    if (props.type === 'submv') {
      return FormatSongTime(item.durationms);
    }
    return null;
  };

  const artists = (item: any) => {
    if (props.type === 'songs') {
      return item.ar;
    }
    if (props.type === 'albums' || props.type === 'mvs') {
      return item.artists;
    }
    return null;
  };

  const name = (item: any) => {
    if (props.type === 'userprofiles') {
      return item.nickname;
    }
    if (props.type === 'submv') {
      return item.title;
    }
    return item.name;
  };
</script>

<template>
  <div class="cover-row" v-if="list">
    <div class="item" v-for="item in list" :key="item.id">
      <CoverImg :src="src(item)" :item="item" @click="to(item)"></CoverImg>
      <div class="info">
        <div class="cover-play">
          <span class="play-count" v-if="playCount(item)">
            <SvgIcon icon-class="play"></SvgIcon>
            {{ playCount(item) }}
          </span>
          <span class="play-time" v-if="playTime(item)">
            {{ playTime(item) }}
          </span>
        </div>
        <div class="cover-artists" v-if="artists(item)">
          <ArtistsName :artists="artists(item)"></ArtistsName>
        </div>
        <div class="cover-title">
          <span @click="to(item)">
            {{ name(item) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .cover-row {
    .item {
      color: var(--color-text);

      .info {
        margin-top: 8px;

        .cover-play {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          line-height: 18px;

          .play-count {
            font-weight: 600;
            color: var(--color-text);

            .svg-icon {
              height: 8px;
              width: 8px;
            }
          }

          .play-time {
            font-weight: 600;
            color: var(--color-text);
          }
        }

        .cover-artists {
          font-size: 13px;
          line-height: 18px;
          margin: 3px 0;
          opacity: 0.68;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          word-break: break-word;
        }

        .cover-title {
          margin-top: 6px;

          span {
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            word-break: break-all;
          }
        }
      }
    }
  }
</style>
