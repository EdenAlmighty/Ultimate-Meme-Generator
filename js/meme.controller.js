'use strict'

let gElCanvas
let gCtx
let gStartPos
let meme
let gLine = {}

function createLine(pos) {
    gLine = {
        pos,
        size: 60,
        color: 'blue',
        isDrag: false,
    }
}
function getLine() {
    return gLine
}
// let gCurrMeme

function onInit() {
    renderGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()

    const meme = onGetMeme()
    const { lines } = meme
    gElCanvas.addEventListener('click', function (event) {
        let rect = gElCanvas.getBoundingClientRect()
        let x = event.clientX - rect.left
        let y = event.clientY - rect.top

        meme.lines.forEach(function (line, idx) {
            if (checkClick(meme, line, x, y)) {
                console.log('yes', idx);
            }
        })
    })

    resizeCanvas()
}



// function checkClick(ev, x, y) {
//     const pos = getEvPos(ev)
//     const selectedLine = getLinePosition(pos.x, pos.y)
//     // return x >= line.x &&
//     //     x <= line.x + line.width &&
//     //     line.y - textObj.height &&
//     //     y <= line.y
//     console.log(selectedLine);
// }

function checkClick(ev) {
    const pos = getEvPos(ev)
    const meme = onGetMeme()
    let lineSelected = false

    meme.lines.forEach((line, idx) => {
        // if (Math.sqrt(pos.y - line.y) ||  Math.sqrt(pos.x - line.x) < line.width) {

        const textMetrics = gCtx.measureText(line.txt)
        const textWidth = textMetrics.width
        const textHeight = line.size

        const centerX = textWidth / 2
        const centerY = textHeight / 2

        const left = line.x - centerX
        const right = line.x + centerX
        const top = line.y - centerY
        const bottom = line.y + centerY



        if (pos.x >= left && pos.x <= right && pos.y >= top && pos.y <= bottom) {
            meme.selectedLineIdx = idx
            // line.boundingBox = getLinePosition(pos.x, pos.y)
            lineSelected = true
            console.log(line);
            console.log('selectedLineIdx', meme.selectedLineIdx, ' pos.x', pos.x, ' pos.y', pos.y);
        }
    })

    if (lineSelected) {
        console.log(lineSelected)
        renderMeme()
    }
}

// function getLinePosition(x, y) {
//     const meme = onGetMeme()
//     const lines = meme.lines
//     // console.log(lines);
//     return lines.findIndex(line => {
//         // const boundingBox = line.boundingBox
//         // console.log(line);
//         // if(!boundingBox){
//         //     return false
//         // }
//         // const { x: left, y: top, width, height } = line.boundingBox
//         // return x >= left && x <= left + width && y >= top && y <= top + height
//         return line.boundingBox &&
//             x >= line.boundingBox.left &&
//             x <= line.boundingBox.right &&
//             y >= line.boundingBox.top &&
//             y <= line.boundingBox.top + line.boundingBox.height
//     })
// }
function renderMeme() {
    gCtx.save()
    // console.log(gCtx);
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
                line.boundingBox = bounds
                console.log(line);
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
    document.getElementById('text-input').value = ''
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

