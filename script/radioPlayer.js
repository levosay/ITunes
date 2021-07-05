export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const faVolumeDown = document.querySelector('.fa-volume-down-radio')
    const radioVolume = document.querySelector('.radio-volume')
    const faVolumeUp = document.querySelector('.fa-volume-up-radio')

    const audio = new Audio();
    audio.type = 'audio/aac';
    let nowVolume = new Array();
    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    }

    const selecItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }

    const downVolume = () => {
        nowVolume.push(audio.volume);
        if (nowVolume.length > 2) {
            nowVolume.shift()
        }
        if (audio.volume == 0) {
            audio.volume = nowVolume[0];
            radioVolume.value = audio.volume * 100;
        } else {
            audio.volume = 0;
            radioVolume.value = audio.volume;
        }
    }

    radioNavigation.addEventListener('change', (event) => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        selecItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;

        audio.play();
        changeIconPlay();

        audio.volume = radioVolume.value / 100;
    })

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
    })

    faVolumeDown.addEventListener('click', downVolume)

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

    faVolumeUp.addEventListener('click', () => {
        audio.volume = 1;
        radioVolume.value = audio.volume * 100;
    })

    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    }
};