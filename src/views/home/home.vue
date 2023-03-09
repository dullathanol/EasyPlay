<script setup>
import RecommendedDaily from '@/components/Body/RecommendedDaily.vue';
import FMCard from '@/components/Body/FMCard.vue';
import PlayListCover from '@/components/Body/PlayListCover.vue';
import MvListCover from '@/components/Body/MvListCover.vue';
import RankListCover from '@/components/Body/RankListCover.vue';
import { getPersonalized, getToplist } from '@/apis/playlist.js'
import { getMvAll } from '@/apis/mvlist.js'
import { ref } from 'vue';

const playlist = ref([{}])
const mvAll = ref([{}])
const toplist = ref([{}])

const loadData = async () => {
    const Personalized = await getPersonalized(6)
    playlist.value = Personalized.result
    const MvAll = await getMvAll(10)
    mvAll.value = MvAll.data
    const Toplist = await getToplist()
    toplist.value = Toplist.list.slice(0, 5)
}

loadData()
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
            <PlayListCover :playlist="playlist"></PlayListCover>
        </div>
        <div class="index-row">
            <div class="title">
                推荐MV
                <router-link to="/expolore">查看更多</router-link>
            </div>
            <MvListCover :mvlist="mvAll"></MvListCover>
        </div>
        <div class="index-row">
            <div class="title">
                排行榜
                <router-link to="/expolore">查看更多</router-link>
            </div>
            <RankListCover :toplist="toplist"></RankListCover>
        </div>
    </div>
</template>

<style lang='less' scoped>
.home {
    margin: 64px 10vw 96px 10vw;

    .index-row {
        margin-top: 54px;

        .title {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 20px;
            font-size: 28px;
            font-weight: 700;
            color: var(--color-text);

            a {
                font-size: 14px;
                font-weight: 600;
                opacity: 0.68;
            }
        }

        .for-you-row {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
        }
    }
}
</style>