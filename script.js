document.addEventListener('DOMContentLoaded', function() {
    let bottleCount = 0;
    const counterElement = document.getElementById('bottle-counter');
    
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
    
    document.getElementById('chester-bottle').addEventListener('click', function() {
        const bottle = this;
        const character = document.getElementById('bar-character');
        
        if (bottle.classList.contains('bottle-open')) return;
        
        bottleCount++;
        counterElement.textContent = bottleCount;
        
        bottle.classList.add('bottle-open');
        character.classList.add('drink-animation');
        
        try {
            new Audio('assets/bottle-open.mp3').play();
        } catch(e) {}
        
        if (bottleCount === 5) {
            setTimeout(() => {
                try {
                    new Audio('assets/five-bottles.mp3').play();
                } catch(e) {}
            }, 1500);
        }
        
        setTimeout(() => {
            character.classList.remove('drink-animation');
            bottle.classList.remove('bottle-open');
            bottle.classList.add('bottle-return');
            
            setTimeout(() => {
                bottle.classList.remove('bottle-return');
            }, 500);
        }, 2000);
    });
    
    document.getElementById('door-handles').addEventListener('click', function() {
        const handles = this;
        const character = document.getElementById('door-character');
        
        if (handles.classList.contains('door-open')) return;
        
        handles.classList.add('door-open');
        character.classList.remove('hidden');
        
        try {
            new Audio('assets/door-sound.mp3').play();
        } catch(e) {}
        
        setTimeout(() => {
            try {
                new Audio('assets/lobanov.mp3').play();
            } catch(e) {}
            
            setTimeout(() => {
                character.classList.add('enter-door');
            }, 500);
        }, 1500);
        
        setTimeout(() => {
            handles.classList.remove('door-open');
            character.classList.remove('enter-door');
            character.classList.add('hidden');
            character.style.transform = 'translateX(-50%)';
            character.style.opacity = '1';
        }, 4000);
    });
});