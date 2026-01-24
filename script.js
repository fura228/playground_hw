document.addEventListener("DOMContentLoaded", () => {
    let left = document.querySelector('#left');
    let right = document.querySelector('#right');

    let drugable = false;
    let hasTouched = false;
    let triggerSound = new Audio('assets/899273569_3.mp3');

    right.addEventListener('pointerdown', (e) => {
        drugable = true;
        right.style.left = `${e.clientX - right.offsetWidth / 2}px`;
    });

    right.addEventListener('pointermove', (e) => {
        if (!drugable) return;

        let rect = right.getBoundingClientRect();
        let desiredLeft = e.clientX - rect.width / 2;
        let maxLeft = window.innerWidth - rect.width;

        let clampedLeft = Math.min(Math.max(desiredLeft, 0), maxLeft);
        right.style.left = `${clampedLeft}px`;

        
        if (isTouching(right, left)) {
            if (!hasTouched) {
                hasTouched = true;
                triggerSound.currentTime = 0;
                triggerSound.play();
            }
        } else {
            hasTouched = false;
        }
    });

    document.addEventListener('pointerup', () => {
        drugable = false;
    });
});

function isTouching(el1, el2) {
    let r1 = el1.getBoundingClientRect();
    let r2 = el2.getBoundingClientRect();
    return !(
        r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom
    );
}