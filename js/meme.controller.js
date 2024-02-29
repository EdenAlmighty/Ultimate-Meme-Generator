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

    const meme = onGetMeme()
    meme.url = `img/${meme.selectedImgId.id}.jpg`
    const { lines } = meme



    const img = new Image()
    img.src = meme.url
    img.onload = () => {
        coverCanvasWithImg(img)
        meme.lines.forEach((line, idx) => {
            renderText(line)
            if (idx === meme.selectedLineIdx) {
                const metrics = gCtx.measureText(line.txt)
                const width =
                    Math.abs(metrics.actualBoundingBoxLeft) +
                    Math.abs(metrics.actualBoundingBoxRight)
                const height =
                    Math.abs(metrics.actualBoundingBoxAscent) +
                    Math.abs(metrics.actualBoundingBoxDescent)

                const bounds = {
                    top: line.y - metrics.actualBoundingBoxAscent,
                    right: line.x + metrics.actualBoundingBoxRight,
                    bottom: line.y + metrics.actualBoundingBoxDescent,
                    left: line.x - metrics.actualBoundingBoxLeft
                }
                gCtx.strokeStyle = 'whitesmoke'
                gCtx.lineWidth = 2
                gCtx.strokeRect(bounds.left, bounds.top, width, height)
            }
        });

    }
}
// switchSelectedText()
function onSwitchLine() {
    switchLine()
    renderMeme()

}

function renderText(line) {
    // gCtx.strokeStyle = line.color
    let { x, y, size, txt, color } = line
    if (!x || !y) x = 400, y = 400

    gCtx.strokeStyle = "red"

    // txt.boundingBox = boundingBox

    // gCtx.fillText(`${txt}`)
    // console.log(line.size);
    gCtx.fillStyle = color
    gCtx.font = size + 'px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    // gCtx.fillText(gCtx.measureText(txt.width), x, y)
    gCtx.fillText(txt, x, y)
    drawText(line)
}

function drawText(line) {
    const { x, y, size, txt, color } = line

    gCtx.fillStyle = color
    gCtx.font = size + 'px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
}

function onAddLine() {
    addLine()
    renderMeme()
    const elTextInput = document.getElementById('text-input')
    elTextInput.value = ''
}

function onIncreaseLineSize() {
    increaseLineSize()
    renderMeme()
}

function onDecreaseLineSize() {
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
    renderMeme()
}

function onGetImgIdx(imgId) {
    return getImgIdx(imgId)
}

function onGetSelectedLine() {
    getSelectedLine()
}

function onGetImgURL(imgId) {
    getImgURL(imgId)
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

