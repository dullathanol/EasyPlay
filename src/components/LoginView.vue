<script setup lang="ts">
  import { getLoginQrKey, getLoginQrCreate, getLoginQrCheck } from '@/apis/modules/login';
  import { initCookie } from '@/hooks/init';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const router = useRouter();

  const qrImg = ref(null);
  const qrMessage = ref('打开网易云音乐APP扫码登录');

  const loadData = async () => {
    const LoginKey = await getLoginQrKey();
    const unikey = LoginKey.data.unikey;
    const LoginCreate = await getLoginQrCreate(unikey);

    qrImg.value = LoginCreate.data.qrimg;

    let timer = setInterval(async () => {
      const LoginCheck = await getLoginQrCheck(unikey);
      if (LoginCheck.code == 800) {
        qrMessage.value = LoginCheck.message;
        clearInterval(timer);
      }
      if (LoginCheck.code == 802) {
        qrMessage.value = LoginCheck.message;
      }
      if (LoginCheck.code == 803) {
        qrMessage.value = LoginCheck.message;
        localStorage.setItem('cookie', LoginCheck.cookie);
        initCookie().then(() => {
          router.push({ name: 'library' });
        });
        clearInterval(timer);
      }
    }, 1000);
  };

  loadData();
</script>

<template>
  <div class="login">
    <div class="login-container">
      <div class="section-1">
        <img src="@/assets/img/netease-music.png" />
      </div>
      <div class="title">登录网易云账号</div>
      <div class="section-2">
        <div class="qr-code-container">
          <img :src="qrImg" />
        </div>
        <div class="qr-code-info">
          {{ qrMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .login {
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .section-1 {
        margin: 24px 0;

        img {
          width: 64px;
        }
      }

      .title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 24px;
        color: var(--color-text);
      }

      .section-2 {
        .qr-code-container {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          padding: 10px;
          border-radius: 1rem;
          margin-bottom: 12px;
        }

        .qr-code-info {
          color: var(--color-text);
          text-align: center;
        }
      }
    }
  }
</style>
