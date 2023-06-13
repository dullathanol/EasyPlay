<script setup lang="ts">
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/modules/userStore';

  import ButtonIcon from '@/components/ButtonIcon.vue';
  import SvgIcon from '@/components/SvgIcon.vue';

  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();

  const inputFocus = ref(false);
  const keywords = ref();

  const go = (where: string) => {
    if (where === 'back') router.go(-1);
    else router.go(1);
  };

  const doSearch = () => {
    if (!keywords.value) return;
    if (route.name === 'search' && route.query.keywords === keywords.value) return;
    router.push({
      name: 'search',
      query: { keywords: keywords.value },
    });
  };
</script>

<template>
  <div class="nav-bar">
    <div class="navigation-buttons">
      <ButtonIcon @click="go('back')">
        <SvgIcon icon-class="arrow-left"></SvgIcon>
      </ButtonIcon>
      <ButtonIcon @click="go('forward')">
        <SvgIcon icon-class="arrow-right"></SvgIcon>
      </ButtonIcon>
    </div>
    <div class="navigation-links">
      <router-link to="/" :class="{ active: route.name === 'home' }">首页</router-link>
      <router-link to="/expolore" :class="{ active: route.name === '/expolore' }">发现</router-link>
      <router-link to="/library" :class="{ active: route.name === '/library' }">我的</router-link>
    </div>
    <div class="navigation-avatar">
      <div class="search-box" :class="{ active: inputFocus }">
        <SvgIcon icon-class="search"></SvgIcon>
        <input
          type="search"
          v-model="keywords"
          @keydown.enter="doSearch"
          @focus="inputFocus = true"
          @blur="inputFocus = false"
        />
      </div>
      <router-link to="/library" class="avatar">
        <img v-if="userStore.login" :src="userStore.avatarUrl" />
        <SvgIcon v-else icon-class="login"></SvgIcon>
      </router-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 10vw;
    z-index: 1;
    background-color: var(--color-navbar-bg);
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
        transition: 0.2s;

        &:hover {
          background: var(--color-hover-bg);
        }

        &:active {
          transform: scale(0.9);
        }

        &.active {
          color: var(--color-primary);
        }
      }
    }

    .navigation-avatar {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .search-box {
        display: flex;
        align-items: center;
        width: 200px;
        height: 32px;
        border-radius: 7px;
        background: var(--color-hover-bg);

        .svg-icon {
          height: 18px;
          width: 18px;
          margin: 0 7px;
          opacity: 0.28;
          color: var(--color-text);
        }

        input {
          font-size: 16px;
          width: 90%;
          font-weight: 600;
          border: none;
          background: transparent;
          color: var(--color-text);
        }

        &.active {
          background-color: var(--color-panel-bg);

          input,
          .svg-icon {
            opacity: 1;
            color: var(--color-text);
          }
        }
      }

      .avatar {
        margin-left: 12px;
        cursor: pointer;

        img {
          height: 30px;
          border-radius: 50%;
          vertical-align: middle;
        }

        .svg-icon {
          width: 24px;
          height: 24px;
          vertical-align: middle;
        }

        &:hover {
          filter: brightness(80%);
        }
      }
    }
  }
</style>
