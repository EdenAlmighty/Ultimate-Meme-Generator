'use strict'

let gElCanvas
let gCtx
// let gCurrMeme

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
}

// function getMeme(){

// }
// function renderMeme(selectedImg, selectedLine) {

// function onGetImgURL(meme) {
//     var imgidi = getImgURL(meme.id)
//     console.log(imgidi);
// }

function renderMeme() {
    // debugger
    // var selectedLine = currMeme.lines.txt
    // onGetMeme()
    const meme = onGetMeme()
    console.log(meme);
    meme.url = `img/${meme.selectedImgId.id}.jpg`

    const { lines } = meme
    console.log(lines);
    console.log(lines[0].txt);

    const img = new Image()
    img.src = meme.url


    img.onload = () => {
        coverCanvasWithImg(img)
        renderText(lines[0])

    }
}

function renderText(line) {
    // gCtx.strokeStyle = line.color
    gCtx.fillStyle = line.color

    // gCtx.fillText(`${txt}`)
    console.log(line.size);
    gCtx.font = line.size + 'px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, 200, 200)

}

function onIncreaseLineSize() {
    increaseLineSize()
    renderMeme()
}

function onDecreaseLineSize(){
    decreaseLineSize()
    renderMeme()
}

function onChangeLineColor(color) {
    changeLineColor(color)
    // console.log(color);
}

function onSelectImg(elImg, imgUrl) {
    setImg(elImg, imgUrl)
    renderMeme()

}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    // Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth
}

function onGetMeme() {
    return getMeme()
    //  console.log(gCurrMeme);

}

function onSetLineTxt(newTxt) {
    console.log(newTxt);

    setLineText(newTxt)

    // console.log(newTxt);
    // setLineTxt(newTxt)
    renderMeme()
    // renderText()
}



function onGetImgIdx(imgId) {
    return getImgIdx(imgId)
}


function onGetImgURL(imgId) {
    getImgURL(imgId)
}
