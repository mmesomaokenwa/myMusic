export const playSong = e => {
    if (e) e.preventDefault()
    document.querySelector('.song').play();
    document.querySelector('.play').classList.add('hidden');
    document.querySelector('.pause').classList.remove('hidden');
}

export const pauseSong = e  => {
    if (e) e.preventDefault()
    document.querySelector('.song').pause();
    document.querySelector('.play').classList.remove('hidden')
    document.querySelector('.pause').classList.add('hidden')
}