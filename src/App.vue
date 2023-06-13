<script setup lang="ts">
  import NavBar from '@/views/Header/NavBar.vue';
  import PlayBar from '@/views/Footer/PlayBar.vue';
</script>

<template>
  <div class="app-header">
    <NavBar></NavBar>
  </div>
  <div class="app-content">
    <router-view></router-view>
  </div>
  <div class="app-footer">
    <PlayBar></PlayBar>
  </div>
</template>
