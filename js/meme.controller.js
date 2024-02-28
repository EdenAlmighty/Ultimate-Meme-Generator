'use strict'

let gElCanvas
let gCtx

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
}

// function getMeme(){

// }

function renderMeme() {

    const meme = onGetMeme()
    const line = onSetLineTxt()


    const img = new Image()
    img.src = 'img/square.jpg'


    // img.onload = () => {
    //     gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
    // }
    // gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
}

function renderText(line) {
    var line = onSetLineTxt(txt)
    console.log(line);
	gCtx.strokeStyle = 'orange'

	gCtx.fillText = 'black'

	gCtx.font = '45px Arial'
	gCtx.textAlign = 'center'
	gCtx.textBaseline = 'middle'


}

function onSelectImg(elImg) {
    coverCanvasWithImg(elImg)
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    renderText()
    console.log(renderText());
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    // Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth
}

function onGetMeme() {
    getMeme()
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}