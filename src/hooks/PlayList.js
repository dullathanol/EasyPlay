import pinia from '@/utils/pinia.js'
import { getNewsong } from '@/apis/playlist.js';
import { getRecommendSongs } from '@/apis/user.js';
import { useUserStore } from '@/stores/userStore.js';
import { usePlaylistStore } from '@/stores/playlistStore.js';

const userStore = useUserStore(pinia)
const playlistStore = usePlaylistStore(pinia)


export const getRecommend = () => {
    if (userStore.login) {
        getRecommendSongs().then((RecommendSongs) => {
            playlistStore.recommendSong = RecommendSongs.data.dailySongs
        })
    } else {
        getNewsong().then((Newsong) => {
            playlistStore.recommendSong = Newsong.result
        })
    }
}




