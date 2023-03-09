<script setup>
import Cover from '@/components/Body/Cover.vue';

const props = defineProps(['toplist'])

</script>

<template>
    <div class="cover-row">
        <div class="item" v-for="item in toplist" :key="item.id">
            <Cover :item="item" :type="'coverImgUrl'"></Cover>
            <div class="info">
                <div class="cover-play">
                    <span class="play-count">
                        {{ item.updateFrequency }}
                    </span>
                </div>
                <div class="cover-title">
                    <span>
                        <router-link :to="{ name: 'playlist', query: { id: item.id } }">{{ item.name }}</router-link>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
.cover-row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px 25px;

    .item {
        color: var(--color-text);

        .info {
            margin-top: 8px;

            .cover-play {
                font-size: 12px;
                line-height: 18px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                word-break: break-word;

                .play-count {
                    font-weight: 600;
                    color: var(--color-text);
                }
            }

            .cover-title {
                margin-top: 6px;

                span {
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 20px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    word-break: break-all;
                }
            }
        }
    }
}
</style>