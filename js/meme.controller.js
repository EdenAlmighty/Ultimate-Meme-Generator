'use strict'

let gElCanvas
let gCtx
let gStartPos
let meme
let gLine = {}


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

function checkClick(ev) {
    gStartPos = getEvPos(ev)
    const meme = onGetMeme()
    let lineSelected = false


    meme.lines.forEach((line, idx) => {

        const textMetrics = gCtx.measureText(line.txt)
        const textWidth = textMetrics.width
        const textHeight = line.size

        const centerX = textWidth / 2
        const centerY = textHeight / 2

        const left = line.x - (centerX - 2)
        const right = line.x + (centerX + 2)
        const top = line.y - (centerY + 10)
        const bottom = line.y + (centerY + 2)




        if (gStartPos.x >= left &&
            gStartPos.x <= right &&
            gStartPos.y >= top &&
            gStartPos.y <= bottom) {
            meme.selectedLineIdx = idx
            lineSelected = true
            renderText(line)
            renderMeme()
            console.log(line);
            console.log('selectedLineIdx', meme.selectedLineIdx, ' gStartPos.x', gStartPos.x, ' gStartPos.y', gStartPos.y);
        }
    })

    if (lineSelected) {
        // console.log(meme.lines[meme.selectedLineIdx].txt);
        const elInput = document.querySelector('.text-input')
        elInput.value = meme.lines[meme.selectedLineIdx].txt
        elInput.focus()
        document.body.style.cursor = 'grabbing'
        setLineDrag(lineSelected)
    }
}


function onMove(ev) {
    meme = getMeme()
    const isDrag = meme.lines[meme.selectedLineIdx].isDrag
    if (!isDrag) return

    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy, gElCanvas)
    // console.log(gStartPos);

    gStartPos = pos

    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'default'
}


function renderMeme() {
    gCtx.save()
    // console.log(gCtx);
    const meme = onGetMeme()
    meme.url = `img/${meme.selectedImgId.id}.jpg`

    const img = new Image()
    img.src = meme.url
    img.onload = () => {
        coverCanvasWithImg(img)
        meme.lines.forEach((line, idx) => {
            console.log(line);
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

function onChangeFont(ev){
    changeFont(ev)
    renderMeme()
}

function onMoveArrows(ev) {
    const line = getSelectedLine()
    if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
        const moveDirY = ev.key === 'ArrowUp' ? -1 : 1
        line.y += moveDirY * 5

    } else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
        const moveDirX = ev.key === 'ArrowLeft' ? -1 : 1
        line.x += moveDirX * 5
    }
    renderMeme()
}

function onAlignLeft() {
    alignLeft()
    renderMeme()
}

function onAlignCenter() {
    alignCenter()
    renderMeme()
}

function onAlignRight() {
    alignRight()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
    document.getElementById('text-input').value = ''
}

function renderText(line) {
    gCtx.beginPath()
    let { size, txt, color, align, x, y, font, stroke } = line
    // if (!x || !y) x = 100, y = 100
    // const { x, y, size, txt, color, align } = line
    console.log(line);
    // gCtx.strokeStyle = "red"
    gCtx.fillStyle = color
    gCtx.strokeStyle = `${stroke}`
    gCtx.font = size + `px ${font}`
    gCtx.textAlign = `${align}`
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
    // drawText(line)
}

// function drawText(line) {
//     gCtx.beginPath()
//     const { x, y, size, txt, color } = line

//     gCtx.fillStyle = color
//     gCtx.font = size + 'px Arial'
//     gCtx.textAlign = 'center'
//     gCtx.textBaseline = 'middle'
//     gCtx.fillText(txt, x, y)
// }

function onAddLine() {
    addLine()
    renderMeme()
    // const elTextInput = document.getElementById('text-input')
    // elTextInput.focus()
    // elTextInput.value = ''
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
}

function onSelectImg(elImg, imgUrl) {
    document.getElementById("main-gallery").classList.add('hidden')
    document.getElementById("main-editor").classList.remove('hidden')

    setImg(elImg, imgUrl)
    renderMeme()
    resizeCanvas()
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
}

function onGetMeme() {
    return getMeme()
}

function onSetLineTxt(newTxt) {
    setLineText(newTxt)

    renderMeme()
    // renderText()
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

