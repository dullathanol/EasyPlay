<script setup>
import NavBar from './components/Header/NavBar.vue';
import Player from './components/Footer/Player.vue';
</script>

<template>
  <NavBar></NavBar>
  <router-view></router-view>
  <Player></Player>
</template>