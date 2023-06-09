<script setup lang="ts">
  import NavBar from '@/views/Header/NavBar.vue';
  import PlayBar from '@/views/Footer/PlayBar.vue';
</script>

<template>
  <NavBar></NavBar>
  <router-view></router-view>
  <PlayBar></PlayBar>
</template>
