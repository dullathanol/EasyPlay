<script setup>
import SvgIcon from '@/components/Plugins/SvgIcon.vue';
import ListCover from '@/components/Body/ListCover.vue';
import { getMvAll, getFirst, getExclusive } from '@/apis/mvlist.js'
import { mvArea, mvType, mvOrder } from '@/utils/data.js'
import { ref, reactive } from 'vue';

const showCatOptions = ref(false)
const active = ref('all')
const mvlist = ref([{}])
const areaActive = ref(null)
const typeActive = ref(null)
const orderActive = ref(null)
const params = reactive({
    area: '',
    type: '',
    order: '',
})

const loadData = async () => {
    const MvAll = await getMvAll(50, params.area, params.type, params.order)
    mvlist.value = MvAll.data
}

const all = async (info) => {
    showCatOptions.value = false
    active.value = info
    const MvAll = await getMvAll(50)
    mvlist.value = MvAll.data

}

all('all')

const first = async (info) => {
    showCatOptions.value = false
    active.value = info
    const First = await getFirst()
    mvlist.value = First.data
}

const exclusive = async (info) => {
    showCatOptions.value = false
    active.value = info
    const Exclusive = await getExclusive()
    mvlist.value = Exclusive.data
}

const toggleCat = async (item, type) => {
    active.value = null
    if (type == 'area') {
        params.area = item
        areaActive.value = item
    } else if (type == 'type') {
        params.type = item
        typeActive.value = item
    } else if (type == 'order') {
        params.order = item
        orderActive.value = item
    }
    loadData()
}
</script>

<template>
    <div class="expolore-playlist">
        <div class="buttons">
            <div class="button" @click="all('all')" :class="{ active: active === 'all' }">全部MV</div>
            <div class="button" @click="first('first')" :class="{ active: active === 'first' }">最新MV</div>
            <div class="button" @click="exclusive('exclusive')" :class="{ active: active === 'exclusive' }">网易出品</div>
            <div class="button" @click="showCatOptions = !showCatOptions" :class="{ active: showCatOptions }">
                <SvgIcon icon-class="more"></SvgIcon>
            </div>
        </div>
        <div class="panel" v-show="showCatOptions">
            <div class="big-cat">
                <div class="name">地区</div>
                <div class="cats">
                    <div class="cat" v-for="item in mvArea" :key="item" @click="toggleCat(item, 'area')">
                        <span :class="{ active: areaActive === item }">{{ item }}</span>
                    </div>
                </div>
            </div>
            <div class="big-cat">
                <div class="name">类型</div>
                <div class="cats">
                    <div class="cat" v-for="item in mvType" :key="item" @click="toggleCat(item, 'type')">
                        <span :class="{ active: typeActive === item }">{{ item }}</span>
                    </div>
                </div>
            </div>
            <div class="big-cat">
                <div class="name">排序</div>
                <div class="cats">
                    <div class="cat" v-for="item in mvOrder" :key="item" @click="toggleCat(item, 'order')">
                        <span :class="{ active: orderActive === item }">{{ item }}</span>
                    </div>
                </div>
            </div>

        </div>
        <div class="playlists">
            <ListCover class="mv-row" :list="mvlist" :type="'mvs'"></ListCover>
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
            user-select: none;
            cursor: pointer;
            transition: 0.2s;

            &:hover {
                background: var(--color-secondary-bg);
            }

            &.active {
                color: var(--color-primary);

                .svg-icon {
                    color: var(--color-primary);
                }
            }
        }
    }

    .panel {
        margin: 10px 0;
        padding: 0 20px 20px 20px;
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
                        }

                        &.active {
                            color: var(--color-primary);
                        }
                    }
                }
            }
        }
    }

    .playlists {
        margin-top: 24px;

        .mv-row {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 30px 25px;
        }
    }
}
</style>