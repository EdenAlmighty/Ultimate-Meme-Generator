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

function switchToGallery(){
    document.getElementById("main-gallery").classList.remove('hidden')
    document.getElementById("main-editor").classList.add('hidden')
    
}

// function onUploadUserImg()

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
            // const newImg = {
            //     id: getNextImgId(),
            //     url: img.src,
            //     keywords: ['funny', 'custom']
            // }
            // gImgs.push(newImg)
            // console.log(newImg);
        
        // console.log(img);
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
    // onSelectImg()
    renderGallery()
    coverCanvasWithImg(img)
    
}