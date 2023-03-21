import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

let currentTime = localStorage.getItem(STORAGE_KEY);

if (!currentTime) {
  currentTime = 0;
}
player.setCurrentTime(currentTime);

player.on('timeupdate', throttle(playback, 1000));

function playback(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);

  if (data.seconds === data.duration) {
    localStorage.removeItem(STORAGE_KEY);
  }
}
