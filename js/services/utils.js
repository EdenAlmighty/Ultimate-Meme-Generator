'use strict'

function makeId(length = 5) {
    var id = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return id
}

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']
function addListeners() {
	addMouseListeners()
	addTouchListeners()
	//Listen for resize ev
	window.addEventListener('resize', () => {
		resizeCanvas()
		//Calc the center of the canvas
		const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }

		renderMeme()
	})
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', checkClick)
    // gElCanvas.addEventListener('mousemove', onDrag)
    // gElCanvas.addEventListener('mouseup', onEnd)
}

function addTouchListeners() {

    gElCanvas.addEventListener('touchstart', checkClick)
    // gElCanvas.addEventListener('touchmove', onDrag)
    // gElCanvas.addEventListener('touchend', onEnd)
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVENTS.includes(ev.type)) {

        ev.preventDefault()
        ev = ev.changedTouches[0]
        // Calc pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function clearCanvas() {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
    const hamMenu = document.querySelector('.hamburger-menu')
    hamMenu.classList.toggle('active')
}