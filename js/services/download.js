

// DOWNLOAD CANVAS
function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onDownloadCanvas(elLink) {
    elLink.href = '#'       // Clear the link
    const dataUrl = gElCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'my-img'
}

