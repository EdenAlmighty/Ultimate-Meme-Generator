'use strict'


const MEME_DB = 'memeDB'

// _createMeme()

const gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'men'] },
    { id: 2, url: 'img/2.jpg', keywords: ['cute', 'puppy'] },
    { id: 3, url: 'img/3.jpg', keywords: ['cute', 'puppy'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cute', 'cat'] },

]

var gMeme = {

    // selectedImgUrl: 1,
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red',
            x: 200,
            y: 200,
            width: 0,
            height: 0
        },
        {
            txt: 'Yossi\'s house',
            size: 50,
            color: 'blue',
            x: 300,
            y: 300,
            width: 0,
            height: 0
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function addLine() {
    var txt = gMeme.lines[gMeme.selectedLineIdx].txt
    var size = gMeme.lines[gMeme.selectedLineIdx].size
    var color = gMeme.lines[gMeme.selectedLineIdx].color

    // var newLine = [{txt: txt, size: size, color: color}]    
    gMeme.lines.push({ txt: txt, size: size, color: color })
    // gMeme.lines[gMeme.selectedLineIdx]
    if (gMeme.selectedLineIdx <= 1) gMeme.selectedLineIdx = 2
    else gMeme.selectedLineIdx++
    console.log(gMeme.lines);
    console.log(gMeme.lines[gMeme.selectedLineIdx]);
    // console.log(txt, size, color);
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

function getImgURL(imgId) {
    if (imgId) return gImgs[imgId].url
}

function getImgIdx(imgId) {
    return gImgs.findIndex(img => img.id === imgId)
}

// console.log(gMeme);
function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
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
    console.log(newTxt);

}