import pinia from '@/stores';
import { getNewsong } from '@/apis/playlist';
import { getRecommendSongs } from '@/apis/user';
import { useUserStore } from '@/stores/modules/userStore';
import { usePlaylistStore } from '@/stores/modules/playlistStore';

const userStore = useUserStore(pinia);
const playlistStore = usePlaylistStore(pinia);

export const getRecommend = () => {
  if (userStore.login) {
    getRecommendSongs().then((RecommendSongs) => {
      playlistStore.recommendSong = RecommendSongs.data.dailySongs;
    });
  }
  if (!userStore.login) {
    getNewsong().then((Newsong) => {
      playlistStore.recommendSong = Newsong.result;
    });
  }
};
