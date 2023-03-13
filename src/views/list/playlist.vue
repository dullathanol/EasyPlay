<script setup>
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import PlayListCover from '@/components/Body/PlayListCover.vue';
import { getPersonalized, getHighquality, getToplist, getCatlist, getPlayList } from '@/apis/playlist.js'
import { ref } from 'vue';

const showCatOptions = ref(false)
const active = ref('personalized')
const type = ref('personalized')
const playlist = ref([{}])
const catList = ref([{}])
const list = ref([])

const loadData = async () => {
    const CatList = await getCatlist()
    catList.value = CatList

    for (const k in catList.value.categories) {
        const params = { name: catList.value.categories[k] }
        params.sub = catList.value.sub.filter(subItem => { return subItem.category === Number(k) })
        list.value.push(params)
    }

    personalized('personalized')
}

loadData()

const loadPlayList = async (limit, cat) => {
    const PlayList = await getPlayList(limit, cat)
    playlist.value = PlayList.playlists
}

const personalized = async (info) => {
    showCatOptions.value = false
    active.value = info
    type.value = 'picUrl'
    const Personalized = await getPersonalized(48)
    playlist.value = Personalized.result
}

const highquality = async (info) => {
    showCatOptions.value = false
    active.value = info
    type.value = 'coverImgUrl'
    const Highquality = await getHighquality(48)
    playlist.value = Highquality.playlists
}

const rank = async (info) => {
    showCatOptions.value = false
    active.value = info
    type.value = 'coverImgUrl'
    const Toplist = await getToplist()
    playlist.value = Toplist.list
}

const toggleCat = async (sub) => {
    active.value = sub.name
    type.value = 'highquality'
    loadPlayList(48, sub.name)
}
</script>

<template>
    <div class="expolore-playlist">
        <div class="buttons">
            <div class="button" @click="personalized('personalized')" :class="{ active: active === 'personalized' }">推荐歌单
            </div>
            <div class="button" @click="highquality('highquality')" :class="{ active: active === 'highquality' }">精品歌单</div>
            <div class="button" @click="rank('rank')" :class="{ active: active === 'rank' }">排行榜</div>
            <div class="button" @click="showCatOptions = !showCatOptions" :class="{ active: showCatOptions }">
                <SvgIcon icon-class="more"></SvgIcon>
            </div>
        </div>
        <div class="panel" v-show="showCatOptions">
            <div class="big-cat" v-for="cat in list" :key="cat.name">
                <div class="name">{{ cat.name }}</div>
                <div class="cats">
                    <div class="cat" v-for="sub in cat.sub" :key="sub.name" @click="toggleCat(sub)">
                        <span :class="{ active: active === sub.name }">{{ sub.name }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="playlists">
            <PlayListCover :playlist="playlist" :type="type"></PlayListCover>
        </div>
    </div>
</template>

<style lang='less' scoped>
.expolore-playlist {
    .buttons {
        display: flex;
        flex-wrap: wrap;

        .button {
            padding: 8px 16px;
            margin: 10px 16px 6px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-weight: 600;
            border-radius: 8px;
            color: var(--color-text);
            background: var(--color-secondary-bg);
            user-select: none;
            cursor: pointer;
            transition: 0.2s;

            &:hover {
                color: var(--color-primary);
                background: var(--color-primary-bg);
            }

            &.active {
                color: var(--color-primary);
                background-color: var(--color-primary-bg);

                .svg-icon {
                    color: var(--color-primary);
                }
            }
        }
    }

    .panel {
        margin: 10px 0;
        padding: 20px;
        border-radius: 10px;
        color: var(--color-text);
        background: var(--color-secondary-bg);

        .big-cat {
            display: flex;

            .name {
                padding: 10px;
                white-space: nowrap;
                font-size: 18px;
                font-weight: 500;
                user-select: none;
            }

            .cats {
                display: flex;
                flex-wrap: wrap;

                .cat {
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    transition: 0.2s;
                    user-select: none;
                    border-radius: 8px;

                    span {
                        display: inline-block;
                        padding: 10px;
                        margin: 3px 10px;
                        border-radius: 8px;
                        cursor: pointer;

                        &:hover {
                            color: var(--color-primary);
                            background: var(--color-primary-bg);
                        }

                        &.active {
                            color: var(--color-primary);
                            background-color: var(--color-primary-bg);
                        }
                    }
                }
            }
        }
    }

    .playlists {
        margin-top: 24px;
    }
}
</style>