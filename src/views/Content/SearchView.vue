<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { getSearch } from '@/apis/modules/resource';

  import { Skeleton, Tabs, TabPane } from 'ant-design-vue';

  import ListCover from '@/components/ListCover.vue';
  import TrackList from '@/components/TrackList.vue';

  const route = useRoute();

  const list = ref();
  const keywords = ref();
  const activeKey = ref('1');
  const loading = ref<boolean>(true);

  const loadData = (type: number) => {
    getSearch(keywords.value, type).then((Result) => {
      if (type === 1) {
        if (Result.result?.songs) {
          list.value = Result.result.songs;
        } else {
          list.value = null;
        }
      }
      if (type === 10) {
        if (Result.result?.albums) {
          list.value = Result.result.albums;
        } else {
          list.value = null;
        }
      }
      if (type === 100) {
        if (Result.result?.artists) {
          list.value = Result.result.artists;
        } else {
          list.value = null;
        }
      }
      if (type === 1000) {
        if (Result.result?.playlists) {
          list.value = Result.result.playlists;
        } else {
          list.value = null;
        }
      }
      if (type === 1002) {
        if (Result.result?.userprofiles) {
          list.value = Result.result.userprofiles;
        } else {
          list.value = null;
        }
      }
      if (type === 1004) {
        if (Result.result?.mvs) {
          list.value = Result.result.mvs;
        } else {
          list.value = null;
        }
      }
      loading.value = false;
    });
  };

  const handleChange = (activeKey: any) => {
    loading.value = true;
    loadData(Number(activeKey));
  };

  onMounted(() => {
    keywords.value = route.query.keywords;
    loadData(1);
  });
</script>

<template>
  <div class="search">
    <Tabs v-model:activeKey="activeKey" centered @tab-click="handleChange">
      <TabPane key="1" tab="单曲">
        <Skeleton :loading="loading" active>
          <TrackList :playlist="list"></TrackList>
        </Skeleton>
      </TabPane>
      <TabPane key="10" tab="专辑">
        <Skeleton :loading="loading" active>
          <ListCover class="play-row" :list="list" :type="'albums'"></ListCover>
        </Skeleton>
      </TabPane>
      <TabPane key="100" tab="歌手">
        <Skeleton :loading="loading" active>
          <ListCover class="play-row" :list="list" :type="'artists'"></ListCover>
        </Skeleton>
      </TabPane>
      <TabPane key="1000" tab="歌单">
        <Skeleton :loading="loading" active>
          <ListCover class="play-row" :list="list" :type="'playlists'"></ListCover>
        </Skeleton>
      </TabPane>
      <TabPane key="1002" tab="用户">
        <Skeleton :loading="loading" active>
          <ListCover class="play-row" :list="list" :type="'userprofiles'"></ListCover>
        </Skeleton>
      </TabPane>
      <TabPane key="1004" tab="MV">
        <Skeleton :loading="loading" active>
          <ListCover class="mv-row" :list="list" :type="'mvs'"></ListCover>
        </Skeleton>
      </TabPane>
    </Tabs>
  </div>
</template>

<style lang="less" scoped>
  .search {
    .play-row {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 30px 25px;
    }

    .mv-row {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 30px 25px;
    }
  }
</style>
