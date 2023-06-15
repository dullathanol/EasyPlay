export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Main/Home/HomeView.vue'),
  },
  {
    path: '/expolore',
    name: 'expolore',
    component: () => import('@/views/Main/Expolore/ExpoloreView.vue'),
    children: [
      {
        path: '/expolore',
        redirect: '/expolore/playlist',
      },
      {
        path: 'playlist',
        name: 'playlist',
        component: () => import('@/components/PlayCard.vue'),
      },
      {
        path: 'mvlist',
        name: 'mvlist',
        component: () => import('@/components/MVCard.vue'),
      },
    ],
  },
  {
    path: '/library',
    name: 'library',
    component: () => import('@/components/LibraryView.vue'),
    children: [
      {
        path: 'likelist',
        name: 'likelist',
        component: () => import('@/views/Content/ListView.vue'),
      },
    ],
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/Content/ListView.vue'),
  },
  {
    path: '/track',
    name: 'track',
    component: () => import('@/components/TrackView.vue'),
  },
  {
    path: '/lyrics',
    name: 'lyrics',
    component: () => import('@/components/LyricsView.vue'),
  },
  {
    path: '/mv',
    name: 'mv',
    component: () => import('@/components/MVView.vue'),
  },
  {
    path: '/album',
    name: 'album',
    component: () => import('@/components/AlbumView.vue'),
  },
  {
    path: '/artist',
    name: 'artist',
    component: () => import('@/components/ArtistView.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/components/UserView.vue'),
  },
  {
    path: '/dailySongs',
    name: 'dailySongs',
    component: () => import('@/views/Content/DailyTracks.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Content/SearchView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/LoginView.vue'),
  },
];
