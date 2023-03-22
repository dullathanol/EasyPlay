import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/home.vue')
    }, {
      path: '/expolore',
      name: 'expolore',
      component: () => import('@/views/expolore/expolore.vue'),
      children: [
        {
          path: '/expolore',
          redirect: '/expolore/playlist'
        }, {
          path: 'playlist',
          name: 'playlist',
          component: () => import('@/views/list/playlist.vue')
        }, {
          path: 'mvlist',
          name: 'mvlist',
          component: () => import('@/views/mv/mvlist.vue')
        }
      ]
    }, {
      path: '/library',
      name: 'library',
      component: () => import('@/views/library/library.vue'),
      children: [
        {
          path: 'likelist',
          name: 'likelist',
          component: () => import('@/views/list/list.vue')
        }
      ]
    }, {
      path: '/list',
      name: 'list',
      component: () => import('@/views/list/list.vue')
    }, {
      path: '/track',
      name: 'track',
      component: () => import('@/views/list/track.vue')
    }, {
      path: '/lyrics',
      name: 'lyrics',
      component: () => import('@/views/list/lyrics.vue')
    }, {
      path: '/mv',
      name: 'mv',
      component: () => import('@/views/mv/mv.vue')
    }, {
      path: '/album',
      name: 'album',
      component: () => import('@/views/artist/album.vue')
    }, {
      path: '/artist',
      name: 'artist',
      component: () => import('@/views/artist/artist.vue')
    }, {
      path: '/user',
      name: 'user',
      component: () => import('@/views/artist/user.vue')
    }, {
      path: '/dailySongs',
      name: 'dailySongs',
      component: () => import('@/views/home/DailyTracks.vue')
    }, {
      path: '/search',
      name: 'search',
      component: () => import('@/views/expolore/search.vue')
    }, {
      path: '/login',
      name: 'login',
      component: () => import('@/views/library/login.vue')
    }
  ]
})

export default router