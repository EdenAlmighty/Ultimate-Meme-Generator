'use strict'


const MEME_DB = 'memeDB'
const IMG_DB = 'imgDB'
const SAVED_DB = 'savedDB'
const gSavedMemes = loadFromStorage(SAVED_DB) || []

let gFilterBy = ''
var gMeme = _createMeme()

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
    { id: 18, url: 'img/19.jpg', keywords: ['funny', 'cat'] },
    { id: 19, url: 'img/20.jpg', keywords: ['funny', 'cute'] },
    { id: 20, url: 'img/21.jpg', keywords: ['funny', 'men'] },
    { id: 21, url: 'img/22.jpg', keywords: ['funny', 'men'] },
    { id: 22, url: 'img/23.jpg', keywords: ['funny', 'men'] },
    { id: 23, url: 'img/24.jpg', keywords: ['funny', 'men'] },
    { id: 24, url: 'img/25.jpg', keywords: ['funny', 'men'] },
    { id: 25, url: 'img/26.jpg', keywords: ['funny', 'men'] },
    { id: 26, url: 'img/27.jpg', keywords: ['funny', 'men'] },
    { id: 27, url: 'img/28.jpg', keywords: ['funny', 'men'] },
]

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2, 'men': 10 }

function getNextImgId() {
    return gImgs.length += 1
}

function getSavedMemes() {
    return gSavedMemes
}

function _createMeme() {
    gMeme = {
        id: makeId(),
        selectedImgId: 0,
        selectedLineIdx: 0,
        dataURL: '',
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 40,
                color: 'white',
                // stroke: 'black',
                x: 300,
                y: 300,
                isDrag: false,
                align: 'center',
                font: 'impact'
            }
        ]
    }
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
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function setLineText(newTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
    console.log(newTxt);
}

function resetMeme() {
    _createMeme()
}

function setSavedMeme(memeId) {
    const savedMeme = gSavedMemes.find(savedMeme => savedMeme.id === memeId)
    gMeme = savedMeme
}

function saveMeme() {
    const previousMeme = gSavedMemes.find(savedMeme => savedMeme.id === gMeme.id)
    if (previousMeme) {
        previousMeme.dataURL = gMeme.dataURL
        _saveMemeToStorage()
    } else {
        gSavedMemes.push(gMeme)
        _saveMemeToStorage()
    }
}

function setDataURL(dataURL) {
    gMeme.dataURL = dataURL
}

function _saveMemeToStorage() {
    saveToStorage(SAVED_DB, gSavedMemes)
}
