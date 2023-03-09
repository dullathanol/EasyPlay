<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore.js';
import ButtonIcon from '@/components/Plugins/ButtonIcon.vue';
import SvgIcon from '@/components/Plugins/SvgIcon.vue';

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const inputFocus = ref(false)
const keywords = ref(null)

if (localStorage.getItem('cookie')) {
    userStore.loadDetail()
}

const go = (where) => {
    if (where === 'back') router.go(-1)
    else router.go(1)
}

const doSearch = () => {
    if (!keywords.value) return
    if (route.name === 'search' && route.query.keywords === keywords.value) return
    router.push({
        name: 'search',
        query: { keywords: keywords.value }
    })
}

const login = computed(() => {
    if (userStore.login) {
        return { name: 'like' }
    } else {
        return { name: 'login' }
    }
})

const avatarUrl = computed(() => {
    return userStore.userDetail?.avatarUrl ? userStore.userDetail.avatarUrl : ''
})

</script>

<template>
    <div>
        <nav>
            <div class="navigation-buttons">
                <ButtonIcon @click="go('back')">
                    <SvgIcon icon-class="arrow-left"></SvgIcon>
                </ButtonIcon>
                <ButtonIcon @click="go('forward')">
                    <SvgIcon icon-class="arrow-right"></SvgIcon>
                </ButtonIcon>
            </div>
            <div class="navigation-links">
                <router-link to="/home" :class="{ active: !route.path.indexOf('/home') }">首页</router-link>
                <router-link to="/expolore" :class="{ active: !route.path.indexOf('/expolore') }">发现</router-link>
                <router-link :to="login" :class="{ active: !route.path.indexOf('/library') }">我的</router-link>
            </div>
            <div class="right-part">
                <div class="search-box">
                    <div class="container" :class="{ active: inputFocus }">
                        <SvgIcon icon-class="search"></SvgIcon>
                        <div class="input">
                            <input type="search" ref="searchInput" v-model="keywords" :placeholder="inputFocus ? '' : '搜索'"
                                @keydown.enter="doSearch" @focus="inputFocus = true" @blur="inputFocus = false">
                        </div>
                    </div>
                </div>
                <router-link :to="login" class="avatar">
                    <img v-show="avatarUrl" :src="avatarUrl">
                    <SvgIcon v-show="!avatarUrl" icon-class="login"></SvgIcon>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<style lang="less" scoped>
nav {
    // 移出文档流
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 10vw;
    z-index: 100;
    background-color: var(--color-navbar-bg);
    //图形效果  //饱和度  //高斯模糊
    backdrop-filter: saturate(180%) blur(20px);

    .navigation-buttons {
        flex: 1;
        display: flex;
        align-items: center;

        .svg-icon {
            height: 24px;
            width: 24px;
        }
    }

    .navigation-links {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;

        a {
            font-size: 18px;
            font-weight: 700;
            padding: 6px 10px;
            margin: 0 12px;
            border-radius: 6px;
            color: var(--color-text);
            transition: 0.2s;

            &:hover {
                background: var(--color-secondary-bg-for-transparent);
            }

            &:active {
                transform: scale(0.92);
            }

            &.active {
                color: var(--color-primary);
            }
        }
    }

    .right-part {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .search-box {
            display: flex;
            justify-content: flex-end;

            .container {
                display: flex;
                align-items: center;
                width: 200px;
                height: 32px;
                border-radius: 8px;
                background: var(--color-secondary-bg-for-transparent);

                .svg-icon {
                    height: 15px;
                    width: 15px;
                    margin: 0 6px;
                    color: var(--color-text);
                    opacity: 0.28;
                }

                .input {
                    input {
                        font-size: 16px;
                        width: 96%;
                        font-weight: 600;
                        border: none;
                        background: transparent;
                        color: var(--color-text);
                    }
                }

                &.active {
                    background-color: var(--color-primary-bg-for-transparent);

                    input,
                    .svg-icon {
                        opacity: 1;
                        color: var(--color-text);
                    }
                }
            }
        }

        .avatar {
            img {
                user-select: none;
                height: 30px;
                margin-left: 12px;
                vertical-align: middle;
                border-radius: 50%;
                cursor: pointer;
            }

            .svg-icon {
                user-select: none;
                width: 24px;
                height: 24px;
                margin-left: 12px;
                vertical-align: middle;
                cursor: pointer;
            }

            &:hover {
                //模糊  //亮度值
                filter: brightness(80%);
            }
        }
    }
}

@media(max-width:1366px) {
    nav {
        padding: 0 5vw;
    }
}
</style>