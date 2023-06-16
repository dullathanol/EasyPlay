import pinia from '@/stores';
import { getUserDetail, getUserLikeList, getAlbumSubList, getMvSubList } from '@/apis/modules/user';
import { useUserStore } from '@/stores/modules/userStore';
import { usePlayStore } from '@/stores/modules/playStore';
import { getLoginStatus } from '@/apis/modules/login';

const userStore = useUserStore(pinia);
const playStore = usePlayStore(pinia);

const detail: any = localStorage.getItem('detail');
const userId: any = localStorage.getItem('userId');

export const initCookie = async () => {
  const LoginStatus = await getLoginStatus();
  localStorage.setItem('userId', LoginStatus.data.profile.userId);
  userStore.userId = LoginStatus.data.profile.userId;
  userStore.userDetail = await getUserDetail(userStore.userId);
  userStore.login = true;
};

export const initDetail = async () => {
  const initDetail = JSON.parse(detail);
  playStore.songId = initDetail.songId;
  playStore.songList = initDetail.songList;
  playStore.currentIndex = initDetail.currentIndex;
};

export const Likelist = async (id: number) => {
  if (!localStorage.getItem('cookie')) return;
  const Likelist = await getUserLikeList(userId);
  if (Likelist.ids.includes(id)) {
    return true;
  } else {
    return false;
  }
};

export const AlbumSublist = async (id: number) => {
  if (!localStorage.getItem('cookie')) return;
  const AlbumSublist = await getAlbumSubList();
  if (AlbumSublist.data.map((data: any) => data.id).includes(Number(id))) {
    return true;
  } else {
    return false;
  }
};

export const MvSublist = async (id: number) => {
  if (!localStorage.getItem('cookie')) return;
  if (userStore.login === false) return;
  const MvSublist = await getMvSubList();
  if (MvSublist.data.map((data: any) => data.vid).includes(id)) {
    return true;
  } else {
    return false;
  }
};
