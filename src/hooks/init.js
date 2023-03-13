import pinia from '@/utils/pinia.js'
import { getLoginStatus } from '@/apis/login.js'
import { getArtistSublist, getAlbumSublist } from '@/apis/artist.js';
import { getMvSublist } from '@/apis/mvlist.js';
import { getUserDetail, getLikelist } from '@/apis/user.js'
import { useUserStore } from '@/stores/userStore.js';
import { usePlayStore } from '@/stores/playStore.js';

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
    getLikelist(userStore.userId).then((Likelist) => {
        userStore.likelist = Likelist.ids
    })
}

export const ArtistSublist = async (id) => {
    const ArtistSublist = await getArtistSublist()
    userStore.artistSublist = ArtistSublist.data
}

export const AlbumSublist = async (id) => {
    const AlbumSublist = await getAlbumSublist()
    userStore.albumSublist = AlbumSublist.data
}

export const MvSublist = async (id) => {
    const MvSublist = await getMvSublist()
    userStore.mvSublist = MvSublist.data
}