import pinia from '@/stores';
import { getUserDetail, getUserLikeList, getAlbumSubList, getMvSubList } from '@/apis/modules/user';
import { useUserStore } from '@/stores/modules/userStore';
import { usePlayStore } from '@/stores/modules/playStore';
import { getLoginStatus } from '@/apis/modules/login';

const userStore = useUserStore(pinia);
const playStore = usePlayStore(pinia);

export const initCookie = async () => {
  userStore.cookie = localStorage.getItem('cookie');
  const LoginStatus = await getLoginStatus(userStore.cookie);
  localStorage.setItem('userId', LoginStatus.data.profile.userId);
  userStore.userId = LoginStatus.data.profile.userId;
  userStore.userDetail = await getUserDetail(userStore.userId);
  userStore.login = true;
};

export const initDetail = async () => {
  let detail = JSON.parse(localStorage.getItem('detail'));
  playStore.songId = detail.songId;
  playStore.songList = detail.songList;
  playStore.currentIndex = detail.currentIndex;
};

export const Likelist = async (id) => {
  if (!localStorage.getItem('cookie')) return;
  const Likelist = await getUserLikeList(localStorage.getItem('userId'));
  if (Likelist.ids.includes(id)) {
    return true;
  } else {
    return false;
  }
};

export const AlbumSublist = async (id) => {
  if (!localStorage.getItem('cookie')) return;
  const AlbumSublist = await getAlbumSubList();
  if (AlbumSublist.data.map((data) => data.id).includes(Number(id))) {
    return true;
  } else {
    return false;
  }
};

export const MvSublist = async (id) => {
  if (!localStorage.getItem('cookie')) return;
  if (userStore.login === false) return;
  const MvSublist = await getMvSubList();
  if (MvSublist.data.map((data) => data.vid).includes(id)) {
    return true;
  } else {
    return false;
  }
};
