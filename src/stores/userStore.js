import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
    const login = ref(false)
    const userId = ref(null)
    const cookie = ref(null)
    const userDetail = ref([{}])
    const likelist = ref([])
    const artistSublist = ref([{}])
    const albumSublist = ref([{}])
    const mvSublist = ref([{}])

    return { login, userId, cookie, userDetail, likelist, artistSublist, albumSublist, mvSublist }
})
