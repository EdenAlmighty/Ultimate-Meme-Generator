'use strict'


const MEME_DB = 'memeDB'
let gMeme = {}

_createMeme()

const gImgs = [
    { id: makeId(), url: 'img/1.jpg', keywords: ['funny', 'men'] },
    { id: makeId(), url: 'img/2.jpg', keywords: ['cute', 'puppy'] },
    { id: makeId(), url: 'img/3.jpg', keywords: ['cute', 'puppy'] },
    { id: makeId(), url: 'img/4.jpg', keywords: ['cute', 'cat'] },

]

function _createMeme(imgId) {
    gMeme = {

        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 20,
                color: 'red'
            }
        ]
    }
}

// console.log(gMeme.lines[0]);
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }



function getImgURL(imgId) {
    if (imgId) return gImgs[imgId].url
}

function getImgIdx(imgId) {
    return gImgs.findIndex(img => img.is === imgId)
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

// console.log(gMeme.lines[0].txt);
function setLineTxt(txt){
    gMeme.lines[0].txt = txt
    // console.log(txt);

    return gMeme.lines[0].txt
}