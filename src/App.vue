<script setup lang="ts">
  import NavBar from '@/views/Header/NavBar.vue';
  import PlayBar from '@/views/Footer/PlayBar.vue';

  import { ConfigProvider } from 'ant-design-vue';
  import { theme } from 'ant-design-vue';
</script>

<template>
  <div class="app-header">
    <NavBar></NavBar>
  </div>
  <div class="app-content">
    <ConfigProvider
      :theme="{
        algorithm: theme.darkAlgorithm,
      }"
    >
      <router-view></router-view>
    </ConfigProvider>
  </div>
  <div class="app-footer">
    <PlayBar></PlayBar>
  </div>
</template>
