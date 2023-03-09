<script setup>
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import Cover from '@/components/Body/Cover.vue';
import { FormatPlayCount } from '@/utils/common.js'
import { computed } from 'vue';

const props = defineProps(['playlist', 'type'])

const type = computed(() => {
    if (props.type) {
        return props.type
    } else {
        return 'picUrl'
    }
})

</script>

<template>
    <div class="cover-row">
        <div class="item" v-for="item in playlist" :key="item.id">
            <router-link :to="{ name: 'list', query: { id: item.id } }">
                <Cover :item="item" :type="type"></Cover>
            </router-link>
            <div class="info">
                <div class="cover-play">
                    <span class="play-count">
                        <SvgIcon icon-class="play"></SvgIcon>
                        {{ FormatPlayCount(item.playCount) }}
                    </span>
                </div>
                <div class="cover-title">
                    <span>
                        <router-link :to="{ name: 'list', query: { id: item.id } }">{{ item.name }}</router-link>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='less' scoped>
.cover-row {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
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

                    .svg-icon {
                        height: 8px;
                        width: 8px;
                    }
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