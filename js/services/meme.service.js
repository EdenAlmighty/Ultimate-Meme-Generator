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
            color: 'red'
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }



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

// function getSelectedLine() {
//     return gMeme.lines[gMeme.selectedLineIdx]
// }

function setLineText(newTxt) {
        gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
    console.log(newTxt);

}