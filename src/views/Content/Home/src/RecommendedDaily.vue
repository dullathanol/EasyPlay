<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/modules/userStore';
  import { usePlayStore } from '@/stores/modules/playStore';
  import { getNewSong, getRecommendSong } from '@/apis/modules/resource';
  import { addSong } from '@/hooks/Player';

  import SvgIcon from '@/components/SvgIcon.vue';
  import ButtonIcon from '@/components/ButtonIcon.vue';

  const router = useRouter();
  const userStore = useUserStore();
  const playStore = usePlayStore();

  const index = ref();
  const recommendSong = ref<any[]>([]);

  const goToDailyTracks = () => {
    router.push({ name: 'dailySongs' });
  };

  const playDailyTracks = () => {
    playStore.songList = recommendSong.value;
    addSong(recommendSong.value[index.value].id, index.value, true);
  };

  const coverUrl = computed(() => {
    if (recommendSong.value[index.value]?.picUrl) {
      return recommendSong.value[index.value]?.picUrl;
    }
    if (recommendSong.value[index.value]?.al) {
      return recommendSong.value[index.value]?.al.picUrl;
    }
    return '';
  });

  onMounted(() => {
    if (userStore.login) {
      getRecommendSong().then((RecommendSongs) => {
        recommendSong.value = RecommendSongs.data.dailySongs;
        index.value = Math.floor(Math.random() * recommendSong.value.length);
      });
    } else {
      getNewSong().then((Newsong) => {
        recommendSong.value = Newsong.result;
        index.value = Math.floor(Math.random() * recommendSong.value.length);
      });
    }
  });
</script>

<template>
  <div class="recommended-daily" @click="goToDailyTracks">
    <img :src="coverUrl" />
    <div class="container">
      <div class="title">
        <span>每</span>
        <span>日</span>
        <span>推</span>
        <span>荐</span>
      </div>
    </div>
    <ButtonIcon @click.stop="playDailyTracks">
      <SvgIcon icon-class="play"></SvgIcon>
    </ButtonIcon>
  </div>
</template>

<style lang="less" scoped>
  .recommended-daily {
    width: 100%;
    height: 200px;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      animation: move 30s alternate infinite;
      z-index: -1;
    }

    .container {
      width: 30%;
      height: 200px;
      display: flex;
      align-items: center;
      user-select: none;
      margin-left: 25px;
      color: var(--color-text);

      .title {
        width: 100%;
        height: 100%;
        font-weight: 600;
        font-size: 64px;
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }

    .button-icon {
      position: absolute;
      right: 1.5rem;
      bottom: 1.5rem;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: var(--color-hover-bg);
      backdrop-filter: blur(8px);
      transition: 0.2s;

      .svg-icon {
        height: 50%;
        width: 50%;
      }

      &:hover {
        background: var(--color-active-bg);
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }

  @keyframes move {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-50%);
    }
  }
</style>
