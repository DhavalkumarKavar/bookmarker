// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron')
const items = require('./items')

let showModal = document.getElementById('show-modal');
let closeModal = document.getElementById('close-modal');
let modal = document.getElementById('modal');
let addItem = document.getElementById('add-item');
let itemURL = document.getElementById('url');
let search = document.getElementById('search');

const toggleModalButtons = () => {

    if (addItem.disabled === true)
    {
        addItem.disabled = false;
        addItem.style.opacity = 1
        addItem.innerText = 'Add Item'
        closeModal.style.display = 'inline';
    }
    else{
        addItem.disabled = true;
        addItem.style.opacity = 0.5
        addItem.innerText = 'Adding...'
        closeModal.style.display = 'none';
    }
}

showModal.addEventListener('click', e => {
    modal.style.display = 'flex'
    itemURL.focus()
})

closeModal.addEventListener('click', e => {
    modal.style.display = 'none'
})

addItem.addEventListener('click', e => {
    if (itemURL.value) {
        ipcRenderer.send('new-item', itemURL.value);

        toggleModalButtons();
    }
})

itemURL.addEventListener('keyup', e => {
    if (e.key === 'Enter')
    {
        addItem.click()
    }
})

ipcRenderer.on('new-item-success', (e, message) => {
    
    items.addItem(message, true);
    
    toggleModalButtons();
    modal.style.display = 'none'
    itemURL.value = '';
})

search.addEventListener('keyup', e => {
    Array.from(document.getElementsByClassName('read-item')).forEach(item => {
        let hasMatch = item.innerText.toLowerCase().includes(search.value)

        item.style.display = hasMatch ? 'flex' : 'none'
    })
})

document.addEventListener('keydown', e => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown")
    {
        items.changeSelection(e.key)
    }
})

ipcRenderer.on('menu-show-modal', () => {
    showModal.click()
})

ipcRenderer.on('menu-open-item', () => {
    items.open()
})

ipcRenderer.on('menu-delete-item', () => {
    let selectedItem = items.getSelectedItem()
    items.delete(selectedItem.index)
})

ipcRenderer.on('menu-open-item-native', () => {
    items.openNative()
})

ipcRenderer.on('menu-focus-search', () => {
    search.focus()
})