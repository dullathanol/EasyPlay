<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getMvAll } from '@/apis/modules/resource';
  import { getPersonalized, getToplist } from '@/apis/modules/resource';

  import ListCover from '@/components/ListCover.vue';
  import FMCard from './src/FMCard.vue';
  import RecommendedDaily from './src/RecommendedDaily.vue';

  const playlist = ref([{}]);
  const mvAll = ref([{}]);
  const toplist = ref([{}]);

  onMounted(async () => {
    const Personalized = await getPersonalized(6);
    playlist.value = Personalized.result;
    const MvAll = await getMvAll(10);
    mvAll.value = MvAll.data;
    const Toplist = await getToplist();
    toplist.value = Toplist.list.slice(0, 6);
  });
</script>

<template>
  <div class="home">
    <div class="index-row">
      <div class="title">For You</div>
      <div class="for-you-row">
        <RecommendedDaily></RecommendedDaily>
        <FMCard></FMCard>
      </div>
    </div>
    <div class="index-row">
      <div class="title">
        推荐歌单
        <router-link to="/expolore">查看更多</router-link>
      </div>
      <ListCover class="play-row" :list="playlist" :type="'playlist'"></ListCover>
    </div>
    <div class="index-row">
      <div class="title">
        推荐MV
        <router-link to="/expolore">查看更多</router-link>
      </div>
      <ListCover class="mv-row" :list="mvAll" :type="'mvs'"></ListCover>
    </div>
    <div class="index-row">
      <div class="title">
        排行榜
        <router-link to="/expolore">查看更多</router-link>
      </div>
      <ListCover class="play-row" :list="toplist" :type="'rank'"></ListCover>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .home {
    .index-row {
      margin-top: 30px;

      .title {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-bottom: 20px;
        font-size: 30px;
        font-weight: 700;
        color: var(--color-text);

        a {
          font-size: 14px;
          font-weight: 600;
          opacity: 0.68;
        }
      }

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

      .for-you-row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 25px;
      }
    }
  }
</style>
