import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/index',
      redirect: '/home'
    }, {
      path: '/home',
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
      path: '/dailySongs',
      name: 'dailySongs',
      component: () => import('@/views/home/DailyTracks.vue')
    }, {
      path: '/album',
      name: 'album',
      component: () => import('@/views/artist/album.vue')
    }, {
      path: '/list',
      name: 'list',
      component: () => import('@/views/list/list.vue')
    }, {
      path: '/mv',
      name: 'mv',
      component: () => import('@/views/mv/mv.vue')
    }, {
      path: '/artist',
      name: 'artist',
      component: () => import('@/views/artist/artist.vue')
    }, {
      path: '/login',
      name: 'login',
      component: () => import('@/views/library/login.vue')
    }, {
      path: '/track',
      name: 'track',
      component: () => import('@/views/list/track.vue')
    }
  ]
})

export default router