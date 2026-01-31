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

function init() {
    loadImage('bar-img', CONFIG.images.bar);
    loadImage('door-img', CONFIG.images.door);
    loadImage('char-img', CONFIG.images.character);
    
    document.getElementById('choice-bar').addEventListener('click', function() {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('bar-scene').classList.remove('hidden');
    });
    
    document.getElementById('choice-door').addEventListener('click', function() {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('door-scene').classList.remove('hidden');
    });
    
    document.querySelectorAll('.exit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('main-menu').classList.remove('hidden');
            document.getElementById('bar-scene').classList.add('hidden');
            document.getElementById('door-scene').classList.add('hidden');
        });
    });
    
    document.getElementById('chester-bottle').addEventListener('click', openBottle);
    document.getElementById('door-handles').addEventListener('click', openDoor);
}

function loadImage(id, path) {
    const img = document.getElementById(id);
    if (img && path) {
        img.src = path;
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
            audio.play();
        }
    } catch (e) {}
}

document.addEventListener('DOMContentLoaded', init);