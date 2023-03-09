<script setup>
import { ref, computed } from 'vue';
import SvgIcon from '@/components/Plugins/SvgIcon.vue';

const props = defineProps(['item', 'type'])

const focus = ref(false)

const Url = computed(() => {
    if (props.type === 'picUrl') {
        return props.item.picUrl
    }
    if (props.type === 'cover') {
        return props.item.cover
    }
    if (props.type === 'coverImgUrl') {
        return props.item.coverImgUrl
    }
})
</script>

<template>
    <div class="cover" @mouseover="focus = true" @mouseleave="focus = false">
        <div class="shade">
            <button class="play-button" v-show="focus">
                <SvgIcon icon-class="play"></SvgIcon>
            </button>
        </div>
        <img :src="Url">
    </div>
</template>

<style lang='less' scoped>
.cover {
    position: relative;
    cursor: pointer;

    .shade {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .play-button {
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            backdrop-filter: blur(8px);
            height: 45px;
            width: 45px;
            border-radius: 50%;
            transition: 0.2s;

            .svg-icon {
                width: 45%;
                height: 45%;
            }

            &:hover {
                background: rgba(255, 255, 255, 0.28);
            }

            &:active {
                transform: scale(0.94);
            }
        }
    }

    img {
        width: 100%;
        border-radius: 0.75rem;
        user-select: none;
    }
}
</style>