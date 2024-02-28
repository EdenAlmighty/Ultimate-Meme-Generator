'use strict'
// function onInit(){
//     renderGallery()
// }


function renderGallery(){
    const imgs = getImgs()
    // console.log(imgs);

    const galleryHTML  = imgs.map(img => `
        <img id="${img.id}" 
        src="${img.url}" 
        onclick="onSelectImg(this, '${img.url}')" 
        alt="${img.keywords}">
        `)

    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = galleryHTML.join('')
}