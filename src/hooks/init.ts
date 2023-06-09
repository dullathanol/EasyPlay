import pinia from '@/stores';
import { getUserDetail, getLikelist } from '@/apis/user';
import { useUserStore } from '@/stores/modules/userStore';
import { usePlayStore } from '@/stores/modules/playStore';
import { getAlbumSublist } from '@/apis/artist';
import { getLoginStatus } from '@/apis/login';
import { getMvSublist } from '@/apis/mvlist';

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
  const Likelist = await getLikelist(localStorage.getItem('userId'));
  if (Likelist.ids.includes(id)) {
    return true;
  } else {
    return false;
  }
};

export const AlbumSublist = async (id) => {
  if (!localStorage.getItem('cookie')) return;
  const AlbumSublist = await getAlbumSublist();
  if (AlbumSublist.data.map((data) => data.id).includes(Number(id))) {
    return true;
  } else {
    return false;
  }
};

export const MvSublist = async (id) => {
  if (!localStorage.getItem('cookie')) return;
  if (userStore.login === false) return;
  const MvSublist = await getMvSublist();
  if (MvSublist.data.map((data) => data.vid).includes(id)) {
    return true;
  } else {
    return false;
  }
};
