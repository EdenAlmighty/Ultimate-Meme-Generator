'use strict'

function renderGallery() {
    const imgs = getImgs()

    const galleryHTML = imgs.map(img => `
        <img id="${img.id}" 
        src="${img.url}" 
        onclick="onSelectImg(this, '${img.url}')" 
        alt="${img.keywords}">
        `)

    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = galleryHTML.join('')
    renderKeywordsList()

}

function renderSavedMemes() {
    const imgs = getImgs()

    const savedHTML = imgs.map(img => `
        <img id="${img.id}" 
        src="${img.url}" 
        onclick="onSelectImg(this, '${img.url}')" 
        alt="${img.keywords}">
        `)
    const elSavedMemes = document.querySelector('.saved-container')
    elSavedMemes.innerHTML = savedHTML.join('')
}

function renderKeywordsList() {
    var imgs = onGetImgs()
    console.log(imgs);
}



function switchToSaved() {
    document.getElementById("main-editor").classList.add('hidden')
    document.getElementById("main-gallery").classList.add('hidden')
    document.getElementById("main-saved").classList.remove('hidden')
    renderSavedMemes()
}

function onSetFilterBy(value, key) {
    if (!value) setFilterBy(value)
    setFilterBy(key)
    renderGallery()
}

//UPLOAD IMG FROM USER
function onImgInput(ev) {

    loadImageFromInput(ev, addUserImg)

}

// Read the file from the input
// When done send the image to the callback function

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = ev => {
        let img = new Image()
        img.src = ev.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function addUserImg(img) {

    const newImg = {
        id: getNextImgId(),
        url: img.src,
        keywords: ['funny', 'custom']
    }
    gImgs.push(newImg)
    renderGallery()
}