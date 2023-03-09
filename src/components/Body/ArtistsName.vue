<script setup>
const props = defineProps(['artists'])
</script>

<template>
    <span class="artist-in-line">
        <span v-for="item in artists" class="artist">
            <router-link :to="{ name: 'artist', query: { id: item.id } }">{{ item.name }}</router-link>
        </span>
    </span>
</template>

<style lang='less' scoped>
.artist {
    margin-right: 10px;
    opacity: 0.68;
}
</style>