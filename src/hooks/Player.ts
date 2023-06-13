import pinia from '@/stores';
import { Howl } from 'howler';
import { usePlayStore } from '@/stores/modules/playStore';
import { GetRandomInt } from '@/utils/common';
import { getCheck, getSongUrl } from '@/apis/modules/playlist';

const playStore = usePlayStore(pinia);

let musicProgress = null;

export const play = (url, autoplay) => {
  if (playStore.Howl) playStore.Howl.unload();
  playStore.Howl = new Howl({
    src: url,
    autoplay: autoplay,
    html5: true,
    preload: true,
    format: ['mp3', 'flac'],
    loop: playStore.playMode == 1,
    volume: playStore.volume,
    xhr: {
      method: 'Get',
      withCredentials: true,
    },
    onend: () => {
      playNext();
      return;
    },
  });
  playStore.Howl.once('load', () => {
    playStore.time = Math.floor(playStore.Howl.duration());
  });
  playStore.Howl.on('play', () => {
    playStore.Howl.fade(0, playStore.volume, 200);
    startProgress();
    playStore.playing = true;
  });
  playStore.Howl.on('pause', () => {
    clearInterval(musicProgress);
    playStore.playing = false;
    playStore.Howl.fade(playStore.volume, 0, 200);
  });
};

export const addSong = (id, index, autoplay) => {
  setId(id, index);
  playStore.progress = 0;
  if (playStore.Howl && playStore.volume != 0) {
    playStore.Howl.fade(playStore.volume, 0, 200);
    playStore.Howl.once('fade', () => {
      getSong(id, autoplay);
      return;
    });
    if (playStore.Howl.state() == 'loading' || playStore.Howl.state() == 'unloaded') {
      playStore.Howl.unload();
      getSong(id, autoplay);
    }
  } else {
    getSong(id, autoplay);
  }
};

export const getSong = async (id, autoplay) => {
  await getCheck(id).then((result) => {
    if (result.success == true) {
      getSongUrl(id).then((songInfo) => {
        play(songInfo.data[0].url, autoplay);
        let detail = {
          songId: playStore.songId,
          songList: playStore.songList,
          currentIndex: playStore.currentIndex,
        };
        localStorage.setItem('detail', JSON.stringify(detail));
      });
    }
  });
};

export const startProgress = () => {
  clearInterval(musicProgress);
  playStore.progress = playStore.Howl.seek();
  musicProgress = setInterval(() => {
    if (playStore.Howl.seek() < playStore.time) {
      playStore.progress = playStore.Howl.seek();
    }
  }, 1000);
};

export const startMusic = () => {
  if (!playStore.Howl && !playStore.songId) return;
  if (!playStore.Howl && playStore.songId) {
    addSong(playStore.songId, playStore.currentIndex, true);
    return;
  }
  if (!playStore.playing) {
    playStore.Howl.play();
  }
};

export const pauseMusic = () => {
  if (!playStore.Howl) return;
  clearInterval(musicProgress);
  if (playStore.playing) {
    playStore.Howl.fade(playStore.volume, 0, 200);
    playStore.Howl.once('fade', () => {
      playStore.Howl.pause();
      playStore.playing = false;
    });
  }
};

export const playLast = () => {
  if (!playStore.Howl) return;
  let id = null;
  let index = null;
  if (playStore.playMode != 2) {
    if (playStore.currentIndex - 1 < 0) {
      index = playStore.songList.length - 1;
      id = playStore.songList[index].id;
    } else {
      index = playStore.currentIndex - 1;
      id = playStore.songList[index].id;
    }
  }
  if (playStore.playMode == 2) {
    playStore.shuffleIndex = GetRandomInt(0, playStore.songList.length);
    index = playStore.shuffleIndex;
    id = playStore.songList[index].id;
  }
  addSong(id, index, true);
};

export const playNext = () => {
  if (!playStore.Howl) return;
  let id = null;
  let index = null;
  if (playStore.playMode != 2) {
    if (playStore.songList.length - 1 == playStore.currentIndex) {
      index = 0;
      id = playStore.songList[index].id;
    } else {
      index = playStore.currentIndex + 1;
      id = playStore.songList[index].id;
    }
  }
  if (playStore.playMode == 2) {
    playStore.shuffleIndex = GetRandomInt(0, playStore.songList.length);
    index = playStore.shuffleIndex;
    id = playStore.songList[index].id;
  }
  addSong(id, index, true);
};

export const changePlayMode = () => {
  if (playStore.playMode != 2) playStore.playMode += 1;
  else playStore.playMode = 0;
  if (playStore.playMode == 1) playStore.Howl.loop(true);
  else playStore.Howl.loop(false);
};

export const mute = () => {
  if (playStore.volume == 0) {
    playStore.volume = playStore.volumeBefore;
    playStore.Howl.volume(playStore.volume);
  } else {
    playStore.volumeBefore = playStore.volume;
    playStore.volume = 0;
    playStore.Howl.volume(playStore.volume);
  }
};

export const setId = (id, index) => {
  if (playStore.playMode != 2) {
    playStore.songId = id;
    playStore.currentIndex = index;
  } else {
    playStore.songId = id;
    playStore.shuffleIndex = index;
    playStore.currentIndex = index;
  }
};
