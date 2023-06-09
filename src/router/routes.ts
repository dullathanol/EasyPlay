export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/home.vue'),
  },
  {
    path: '/expolore',
    name: 'expolore',
    component: () => import('@/components/expolore.vue'),
    children: [
      {
        path: '/expolore',
        redirect: '/expolore/playlist',
      },
      {
        path: 'playlist',
        name: 'playlist',
        component: () => import('@/components/playlist.vue'),
      },
      {
        path: 'mvlist',
        name: 'mvlist',
        component: () => import('@/components/mvlist.vue'),
      },
    ],
  },
  {
    path: '/library',
    name: 'library',
    component: () => import('@/components/library.vue'),
    children: [
      {
        path: 'likelist',
        name: 'likelist',
        component: () => import('@/components/list.vue'),
      },
    ],
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/components/list.vue'),
  },
  {
    path: '/track',
    name: 'track',
    component: () => import('@/components/track.vue'),
  },
  {
    path: '/lyrics',
    name: 'lyrics',
    component: () => import('@/components/lyrics.vue'),
  },
  {
    path: '/mv',
    name: 'mv',
    component: () => import('@/components/mv.vue'),
  },
  {
    path: '/album',
    name: 'album',
    component: () => import('@/components/album.vue'),
  },
  {
    path: '/artist',
    name: 'artist',
    component: () => import('@/components/artist.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/components/user.vue'),
  },
  {
    path: '/dailySongs',
    name: 'dailySongs',
    component: () => import('@/components/DailyTracks.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/components/search.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/login.vue'),
  },
];
