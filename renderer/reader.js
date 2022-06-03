let bookmarkerClose = document.createElement('div')

bookmarkerClose.innerText = 'Done'

bookmarkerClose.style.position = 'fixed'
bookmarkerClose.style.bottom = '15px'
bookmarkerClose.style.right = '15px'
bookmarkerClose.style.padding = '5px 10px'
bookmarkerClose.style.fontSize = '20px'
bookmarkerClose.style.fontWeight = 'bold'
bookmarkerClose.style.background = 'dodgerblue'
bookmarkerClose.style.color = 'white'
bookmarkerClose.style.borderRadius = '5px'
bookmarkerClose.style.cursor = 'default'
bookmarkerClose.style.boxShadow = '2px 2px 2px rgba(0,0,0,,0.2)'
bookmarkerClose.style.zIndex = '99999'

bookmarkerClose.onclick = e => {
    window.opener.postMessage(
        {
            action: 'delete-reader-item',
            itemIndex: {{index}}
        }, '*')
}

document.getElementsByTagName('body')[0].append(bookmarkerClose)