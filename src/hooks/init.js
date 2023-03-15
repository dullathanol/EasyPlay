import pinia from '@/utils/pinia.js'
import { getUserDetail, getLikelist, getUserFollow } from '@/apis/user.js'
import { getArtistSublist, getAlbumSublist } from '@/apis/artist.js';
import { useUserStore } from '@/stores/userStore.js';
import { usePlayStore } from '@/stores/playStore.js';
import { getLoginStatus } from '@/apis/login.js'
import { getMvSublist } from '@/apis/mvlist.js';

const userStore = useUserStore(pinia)
const playStore = usePlayStore(pinia)

export const initCookie = async () => {
    userStore.cookie = localStorage.getItem('cookie')
    const LoginStatus = await getLoginStatus(userStore.cookie)
    localStorage.setItem('userId', LoginStatus.data.profile.userId)
    userStore.userId = LoginStatus.data.profile.userId
    const UserDetail = await getUserDetail(userStore.userId)
    userStore.userDetail = UserDetail.profile
    userStore.login = true
}

export const initDetail = async () => {
    let detail = JSON.parse(localStorage.getItem('detail'))
    playStore.songId = detail.songId
    playStore.songList = detail.songList
    playStore.currentIndex = detail.currentIndex
}

export const Likelist = async (id) => {
    const Likelist = await getLikelist(localStorage.getItem('userId'))
    if (Likelist.ids.includes(id)) {
        return true
    } else {
        return false
    }
}

export const AlbumSublist = async (id) => {
    const AlbumSublist = await getAlbumSublist()
    if (AlbumSublist.data.map(data => data.id).includes(Number(id))) {
        return true
    } else {
        return false
    }
}

export const MvSublist = async (id) => {
    const MvSublist = await getMvSublist()
    if (MvSublist.data.map(data => data.vid).includes(id)) {
        return true
    } else {
        return false
    }
}