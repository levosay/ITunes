import { addZero } from './supScript.js';

export const musicPlayerInit = () => {;
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    const playList = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        const loadTrack = () => {
            const isPlayer = audioPlayer.paused;
            const track = playList[trackIndex];
            audioImg.src = `./audio/${track}.jpg`;
            audioHeader.textContent = track.toUpperCase();
            audioPlayer.src = `./audio/${track}.mp3`;

            if (isPlayer) {
                audioPlayer.pause();
            } else {
                audioPlayer.play();
            }
        }

        const prevTreck = () => {
            if (trackIndex !== 0) {
                trackIndex--;
            } else {
                trackIndex = playList.length - 1;
            }
            loadTrack();
            audioProgressTiming.style.width = 0;
        }

        const nextTreck = () => {
            if (trackIndex === playList.length - 1) {
                trackIndex = 0;
            } else {
                trackIndex++;
            }
            loadTrack();
            audioProgressTiming.style.width = 0;
        }

        if (target.classList.contains('audio-button__play')) {
			audio.classList.toggle('play');
			audioButtonPlay.classList.toggle('fa-play');
			audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            const track = playList[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTreck();
        }

        if (target.classList.contains('audio-button__next')) {
            nextTreck();
        }
    })

    audioPlayer.addEventListener('ended', () => {
        nextTreck();
        audioPlayer.play();
    })

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        const minutePassed = Math.floor(currentTime / 60) || '0';
        const secondPassed = Math.floor(currentTime % 60) || '0';
        
        const minuteTotal = Math.floor(duration / 60) || '0';
        const secondTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`;
        audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondTotal)}`;
    })

    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    })
};