<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps(['artists'])

const to = (id) => {
    if (id === 0) return
    router.push({
        name: 'artist',
        query: { id: id }
    })
}
</script>

<template>
    <span class="artist-in-line">
        <span v-for="item in artists" class="artist">
            <span @click="to(item.id)">{{ item.name }}</span>
        </span>
    </span>
</template>

<style lang='less' scoped>
.artist {
    margin-right: 10px;
    opacity: 0.68;
    span{
        cursor: pointer;
    }
}
</style>