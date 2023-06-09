<script setup lang="ts">
  import { useRouter } from 'vue-router';

  defineProps(['artists']);

  const router = useRouter();

  const to = (id: number) => {
    if (id === 0) return;
    router.push({
      name: 'artist',
      query: { id: id },
    });
  };
</script>

<template>
  <span class="artist-in-line">
    <span class="artist" v-for="item in artists" :key="item.id">
      <span @click="to(item.id)">{{ item.name }}</span>
    </span>
  </span>
</template>

<style lang="less" scoped>
  .artist {
    margin-right: 10px;
    opacity: 0.68;
    span {
      cursor: pointer;
    }
  }
</style>
