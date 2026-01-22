
document.addEventListener("DOMContentLoaded", () => {
    let hand = document.querySelector('.static')
    let soundHand = document.querySelector('#left')
    let draggable = false;
    let triggerSound = new Audio('assets/899273569_3.mp3') 
    let followingParent = false 
    function playSound() {
        triggerSound.play()
    }
    document.addEventListener('pointermove', () => {

    })
    hand.addEventListener('pointerdown', (e) => {
        // console.log(e)
        draggable = true
        hand.classList.remove('static')
        hand.style.left = `${e.clientX - hand.getBoundingClientRect().width / 2}px`
    })
    hand.addEventListener('pointermove', (e) => {
        if (draggable) {
        let rect = hand.getBoundingClientRect()
        let maxLeft = window.innerWidth - rect.width
        let desiredLeft = e.clientX - rect.width / 2
        let clampedLeft = Math.min(Math.max(desiredLeft, 0), maxLeft)
        hand.style.left = `${clampedLeft}px`
        switchState()
        checkOverlap()
        
        }
    })
    hand.addEventListener('pointerup', () => {
        draggable = false;
    })
    function checkOverlap() {
        
        let overlap = soundHand.getBoundingClientRect().right >= hand.getBoundingClientRect().rect
        if (overlap){
            linkToParent()
        }
    }
    function linkToParent() {
        let offset = soundHand.getBoundingClientRect().left
        let parrentLeft = hand.getBoundingClientRect().left
        hand.style.left = `${hand.getBoundingClientRect().left - offset + 50}px`
    }
    function switchState() {    
        let isTriggered = hand.getBoundingClientRect().left == soundHand.getBoundingClientRect().right - 50
        if (isTriggered) {
            //hand.classList.add('active')
            playSound()
            followingParent = true
        } else {
            //hand.classList.remove('active')
        }
    }
})