import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLoginStatus } from '@/apis/login.js'
import { getUserDetail } from '@/apis/user.js'

export const useUserStore = defineStore('userStore', () => {
    const login = ref(false)
    const userId = ref(null)
    const cookie = ref(null)
    const userDetail = ref([{}])
    const subscribed = ref(true)    //收藏


    const loadDetail = async () => {
        cookie.value = localStorage.getItem('cookie')
        const LoginStatus = await getLoginStatus(cookie.value)
        localStorage.setItem('userId', LoginStatus.data.profile.userId)
        userId.value = LoginStatus.data.profile.userId
        const UserDetail = await getUserDetail(userId.value)
        userDetail.value = UserDetail.profile
        login.value = true
    }

    return { login, userId, cookie, userDetail, subscribed, loadDetail }
})
