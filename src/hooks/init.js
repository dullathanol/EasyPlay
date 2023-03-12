import pinia from '@/utils/pinia.js'
import { getLoginStatus } from '@/apis/login.js'
import { getUserDetail, getLikelist } from '@/apis/user.js'
import { useUserStore } from '@/stores/userStore.js';
import { usePlayStore } from '@/stores/playStore.js';
import { getRecommend } from '@/hooks/playlist.js';
import { addSong } from './Player';

const userStore = useUserStore(pinia)
const playStore = usePlayStore(pinia)

export const init = async () => {
    userStore.cookie = localStorage.getItem('cookie')
    const LoginStatus = await getLoginStatus(userStore.cookie)
    localStorage.setItem('userId', LoginStatus.data.profile.userId)
    userStore.userId = LoginStatus.data.profile.userId
    const UserDetail = await getUserDetail(userStore.userId)
    userStore.userDetail = UserDetail.profile
    const Likelist = await getLikelist(userStore.userId)
    userStore.likelist = Likelist.ids
    userStore.login = true
    getRecommend()

    let detail = JSON.parse(localStorage.getItem('detail'))
    if (detail) {
        playStore.songList = detail.songList
        addSong(detail.songId, detail.currentIndex, false)
    }
}