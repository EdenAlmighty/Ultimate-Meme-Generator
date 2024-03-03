'use strict'


const MEME_DB = 'memeDB'
const IMG_DB = 'imgDB'
let gFilterBy = ''

var gSavedMems = loadFromStorage(IMG_DB) || {}




var gMeme = loadFromStorage(MEME_DB) || _createMeme()
// _createMeme()



var gImgs = [
    { id: 0, url: 'img/1.jpg', keywords: ['funny', 'men'] },
    { id: 1, url: 'img/2.jpg', keywords: ['cute', 'puppy'] },
    { id: 2, url: 'img/3.jpg', keywords: ['cute', 'baby'] },
    { id: 3, url: 'img/4.jpg', keywords: ['cute', 'cat'] },
    { id: 4, url: 'img/5.jpg', keywords: ['funny', 'baby'] },
    { id: 5, url: 'img/6.jpg', keywords: ['funny', 'men'] },
    { id: 6, url: 'img/7.jpg', keywords: ['funny', 'baby'] },
    { id: 7, url: 'img/8.jpg', keywords: ['funny', 'men'] },
    { id: 8, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
    { id: 9, url: 'img/10.jpg', keywords: ['funny', 'men'] },
    { id: 10, url: 'img/11.jpg', keywords: ['gay', 'men'] },
    { id: 11, url: 'img/12.jpg', keywords: ['funny', 'men'] },
    { id: 12, url: 'img/13.jpg', keywords: ['funny', 'men'] },
    { id: 13, url: 'img/14.jpg', keywords: ['funny', 'men'] },
    { id: 14, url: 'img/15.jpg', keywords: ['funny', 'men'] },
    { id: 15, url: 'img/16.jpg', keywords: ['funny', 'men'] },
    { id: 16, url: 'img/17.jpg', keywords: ['funny', 'men'] },
    { id: 17, url: 'img/18.jpg', keywords: ['funny', 'toy'] },
]

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2, 'men': 10 }



function getNextImgId() {
    return gImgs.length += 1
}

function _createMeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 30,
                color: 'white',
                stroke: 'black',
                x: 100,
                y: 100,
                isDrag: false,
                align: 'center',
                font: 'impact'
            },
            {
                txt: 'Yossi\'s house',
                size: 50,
                color: 'white',
                stroke: 'black',
                x: 150,
                y: 150,
                isDrag: false,
                align: 'center',
                font: 'impact'
            }
        ]
    }
    // saveToStorage(MEME_DB, gMeme)
    return gMeme
}

function changeFont(ev) {
    const line = getSelectedLine()
    line.font = ev
}

function deleteLine() {
    gMeme.lines = gMeme.lines.filter((line, idx) => idx !== gMeme.selectedLineIdx)
    if (gMeme.selectedLineIdx != 0) gMeme.selectedLineIdx--
}

function addLine() {
    var txt = gMeme.lines[gMeme.selectedLineIdx].txt
    var size = gMeme.lines[gMeme.selectedLineIdx].size
    var color = gMeme.lines[gMeme.selectedLineIdx].color
    var font = gMeme.lines[gMeme.selectedLineIdx].font

    gMeme.lines.push({ txt: txt, size: size, color: color, x: 50, y: 50, font })
    if (gMeme.selectedLineIdx <= 1) gMeme.selectedLineIdx = 2
    else gMeme.selectedLineIdx++
    console.log(gMeme.lines);
    renderText()
}

// TEXT IS MEASURED FROM THE CENTER. TO ALIGN LEFT I NEED TO SET RIGHT
function alignLeft() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'right'
}
function alignCenter() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
}
function alignRight() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy
}

function switchLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}

function setImg(elImg, imgUrl) {
    gMeme.selectedImgId = elImg
}
function getRandomMeme() {
    const randMemeIdx = getRandomIntInclusive(0, gImgs.length)
    gMeme.selectedImgId = randMemeIdx
    console.log(gMeme.selectedImgId);
}

function getImgURL(imgId) {
    if (imgId) return gImgs[imgId].url
}

function getImgIdx(imgId) {
    return gImgs.findIndex(img => img.id === imgId)
}

function getMeme() {
    return gMeme
}

function getImgs() {
    if (!gFilterBy) return gImgs

    return gImgs.filter(img =>
        img.keywords.some(keywords => keywords.includes(gFilterBy))
    )

    // console.log(gImgs);
}

function setFilterBy(filterBy) {
    gFilterBy = filterBy
}

function getFilterMap() {
    return gKeywordSearchCountMap
}


function increaseLineSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 1
}

function decreaseLineSize() {
    if (gMeme.lines[gMeme.selectedLineIdx].size <= 0) {
        gMeme.lines[gMeme.selectedLineIdx].size += 1
    }
    gMeme.lines[gMeme.selectedLineIdx].size -= 1
}

function changeLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
    renderMeme()
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setLineText(newTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
    // resizeCanvas()
    // console.log(newTxt);
    console.log(newTxt);
}

function handleSaveBtn() {
    _saveMeme()
    saveCanvas(id, canvasURL)
}

function _saveMeme() {
    saveToStorage(MEME_DB, gMeme)
}

function saveCanvas(id, canvasURL) {
    gSavedMems.push({ id, canvasURL })
    saveToStorage(IMG_DB, gImgs)
}