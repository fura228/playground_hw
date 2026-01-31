// Конфигурация путей
const CONFIG = {
    images: {
        bar: 'assets/images/bar-background.jpg',
        door: 'assets/images/door-background.jpg',
        character: 'assets/images/character.png'
    },
    sounds: {
        bottle: 'assets/sounds/bottle-open.mp3',
        door: 'assets/sounds/door-sound.mp3'
    }
};


const mainMenu = document.getElementById('main-menu');
const barScene = document.getElementById('bar-scene');
const doorScene = document.getElementById('door-scene');
const exitBtns = document.querySelectorAll('.exit-btn');

function init() {

    loadImage('bar-img', CONFIG.images.bar);
    loadImage('door-img', CONFIG.images.door);
    loadImage('char-img', CONFIG.images.character);
    document.getElementById('choice-bar').addEventListener('click', () => showScene('bar'));
    document.getElementById('choice-door').addEventListener('click', () => showScene('door'));
    
    exitBtns.forEach(btn => {
        btn.addEventListener('click', showMenu);
    });
    
    document.getElementById('chester-bottle').addEventListener('click', openBottle);
    document.getElementById('door-handles').addEventListener('click', openDoor);
}

function loadImage(id, path) {
    const img = document.getElementById(id);
    if (img && path) {
        img.src = path;
        img.onerror = () => console.log(`Не загружено: ${path}`);
    }
}

function showMenu() {
    mainMenu.classList.remove('hidden');
    barScene.classList.add('hidden');
    doorScene.classList.add('hidden');
}

function showScene(scene) {
    mainMenu.classList.add('hidden');
    
    if (scene === 'bar') {
        barScene.classList.remove('hidden');
        doorScene.classList.add('hidden');
    } else {
        doorScene.classList.remove('hidden');
        barScene.classList.add('hidden');
    }
}


function openBottle() {
    const bottle = document.getElementById('chester-bottle');
    if (bottle.classList.contains('bottle-open')) return;
    
    bottle.classList.add('bottle-open');
    playSound(CONFIG.sounds.bottle);
    
    setTimeout(() => {
        bottle.classList.remove('bottle-open');
        bottle.style.display = 'none';
        

        const barImg = document.getElementById('bar-img');
        const originalSrc = barImg.src;
        barImg.style.filter = 'brightness(1.2) saturate(1.5)';
        
        setTimeout(() => {
            barImg.style.filter = '';
            bottle.style.display = 'block';
        }, 2000);
    }, 1000);
}


function openDoor() {
    const handles = document.getElementById('door-handles');
    const character = document.getElementById('door-character');
    
    if (handles.classList.contains('door-open')) return;
    
    handles.classList.add('door-open');
    character.classList.remove('hidden');
    playSound(CONFIG.sounds.door);
    
    setTimeout(() => {
        character.classList.add('enter-door');
    }, 1500);
    
    setTimeout(() => {
        handles.classList.remove('door-open');
        character.classList.remove('enter-door');
        character.classList.add('hidden');
        character.style.transform = 'translateX(-50%)';
        character.style.opacity = '1';
    }, 4000);
}


function playSound(path) {
    try {
        if (path) {
            const audio = new Audio(path);
            audio.play().catch(e => console.log('Звук не воспроизведен'));
        }
    } catch (e) {
        console.log('Ошибка звука:', e);
    }
}


document.addEventListener('DOMContentLoaded', init);