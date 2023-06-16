import Plyr from 'plyr';
import pinia from '@/stores';
import { usePlayStore } from '@/stores/modules/playStore';
import { useVideoStore } from '@/stores/modules/videoStore';
import { getMVDetail, getMvUrl, getMVSimi } from '@/apis/modules/resource';
import { startMusic, pauseMusic } from '@/hooks/Player';

const playStore = usePlayStore();
const videoStore = useVideoStore(pinia);

export const play = () => {
  const config = {
    settings: ['captions', 'quality', 'speed', 'loop'],
    autoplay: false,
    quality: {
      default: 1080,
      options: [1080, 720, 480, 240],
    },
  };

  videoStore.Plyr = new Plyr('#player', config);

  videoStore.Plyr.on('playing', () => {
    if (playStore.Howl) pauseMusic();
  });
  videoStore.Plyr.on('pause', () => {
    if (playStore.Howl) startMusic();
  });
};

export const getVideo = (id: number) => {
  getMVDetail(id).then(async (Detail) => {
    videoStore.detail = Detail.data;

    const brs = videoStore.detail.brs;
    const sources: any[] = [];

    for (let i = 0; i < brs.length; i++) {
      await getMvUrl(id, brs[i].br).then((res) => {
        sources.push({
          src: res.data.url,
          type: 'video/mp4',
          size: res.data.r,
        });
      });
    }

    videoStore.Plyr.source = {
      type: 'video',
      title: videoStore.detail.name,
      sources: sources,
      poster: videoStore.detail.cover,
    };

    const Simi = await getMVSimi(id);
    videoStore.simi = Simi.mvs;
  });
};
