<script setup lang="ts">
  import { ref } from 'vue';
  import {
    getToplist,
    getCatlist,
    getPlayList,
    getHighquality,
    getPersonalized,
  } from '@/apis/modules/resource';

  import SvgIcon from '@/components/SvgIcon.vue';
  import ListCover from '@/components/ListCover.vue';

  const showCatOptions = ref(false);
  const active = ref('personalized');
  const type = ref('personalized');
  const playlist = ref();
  const catList = ref();
  const list = ref([]);

  const loadData = async () => {
    const CatList = await getCatlist();
    catList.value = CatList;

    for (const k in catList.value.categories) {
      const params = { name: catList.value.categories[k] };
      params.sub = catList.value.sub.filter((subItem) => {
        return subItem.category === Number(k);
      });
      list.value.push(params);
    }

    personalized('personalized');
  };

  loadData();

  const loadPlayList = async (limit, cat) => {
    const PlayList = await getPlayList(limit, cat);
    playlist.value = PlayList.playlists;
  };

  const personalized = async (info) => {
    showCatOptions.value = false;
    active.value = info;
    type.value = 'playlist';
    const Personalized = await getPersonalized(48);
    playlist.value = Personalized.result;
  };

  const highquality = async (info) => {
    showCatOptions.value = false;
    active.value = info;
    type.value = 'playlists';
    const Highquality = await getHighquality(48);
    playlist.value = Highquality.playlists;
  };

  const rank = async (info) => {
    showCatOptions.value = false;
    active.value = info;
    type.value = 'playlists';
    const Toplist = await getToplist();
    playlist.value = Toplist.list;
  };

  const toggleCat = async (sub) => {
    active.value = sub.name;
    type.value = 'playlists';
    loadPlayList(48, sub.name);
  };
</script>

<template>
  <div class="expolore-playlist">
    <div class="buttons">
      <div
        class="button"
        @click="personalized('personalized')"
        :class="{ active: active === 'personalized' }"
        >推荐歌单
      </div>
      <div
        class="button"
        @click="highquality('highquality')"
        :class="{ active: active === 'highquality' }"
        >精品歌单</div
      >
      <div class="button" @click="rank('rank')" :class="{ active: active === 'rank' }">排行榜</div>
      <div
        class="button"
        @click="showCatOptions = !showCatOptions"
        :class="{ active: showCatOptions }"
      >
        <SvgIcon icon-class="more"></SvgIcon>
      </div>
    </div>
    <div class="panel" v-show="showCatOptions">
      <div class="big-cat" v-for="cat in list" :key="cat.name">
        <div class="name">{{ cat.name }}</div>
        <div class="cats">
          <div class="cat" v-for="sub in cat.sub" :key="sub.name" @click="toggleCat(sub)">
            <span :class="{ active: active === sub.name }">{{ sub.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="playlists">
      <ListCover class="play-row" :list="playlist" :type="type"></ListCover>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .expolore-playlist {
    .buttons {
      display: flex;
      flex-wrap: wrap;

      .button {
        padding: 8px 16px;
        margin: 10px 16px 6px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
        color: var(--color-text);
        user-select: none;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
          background: var(--color-hover-bg);
        }

        &.active {
          color: var(--color-primary);

          .svg-icon {
            color: var(--color-primary);
          }
        }
      }
    }

    .panel {
      margin: 10px 0;
      padding: 20px;
      border-radius: 10px;
      color: var(--color-text);
      background: var(--color-panel-bg);

      .big-cat {
        display: flex;

        .name {
          padding: 10px;
          white-space: nowrap;
          font-size: 18px;
          font-weight: 500;
          user-select: none;
        }

        .cats {
          display: flex;
          flex-wrap: wrap;

          .cat {
            display: flex;
            align-items: center;
            font-size: 16px;
            transition: 0.2s;
            user-select: none;
            border-radius: 8px;

            span {
              display: inline-block;
              padding: 10px;
              margin: 3px 10px;
              border-radius: 8px;
              cursor: pointer;

              &:hover {
                color: var(--color-primary);
              }

              &.active {
                color: var(--color-primary);
              }
            }
          }
        }
      }
    }

    .playlists {
      margin-top: 24px;

      .play-row {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 30px 25px;
      }
    }
  }
</style>
