'use strict'

let itemsSelected = [];
const coursesList = document.querySelector('#lista-cursos')
const containerItemsSelected = document.querySelector('#lista-carrito tbody')
const btnDeleteListItems = document.querySelector('#vaciar-carrito')



loadEventsListeners()
function loadEventsListeners() {
    // ADD
    coursesList.addEventListener('click', pathItemSelected)
    // GET ITEM
    containerItemsSelected.addEventListener("click", pathItemSelected)
    // DELETE
    btnDeleteListItems.addEventListener("click", deleteAllItems)
}


function pathItemSelected(e) {
    if (e.target.classList.contains('agregar-carrito')) {
        e.preventDefault()
        return saveItemIntoArray(e.target.parentNode.parentNode)
    }
    if (e.target.classList.contains('btnDeleteItemById')) {
        e.preventDefault()
        return deleteItemById(e.target.parentNode.parentNode)
    }
    if (e.target.classList.contains('btn-increment')) {
        e.preventDefault()
        return incrementTickets(e.target.parentNode.parentNode)
    }
    if (e.target.classList.contains('btn-decrement')) {
        e.preventDefault()
        return decrementTickets(e.target.parentNode.parentNode)
    }
}


function saveItemIntoArray(item) {
    let itemData = {
        image: item.querySelector('.imagen-curso').src,
        tittle: item.querySelector('h4').textContent,
        price: item.querySelector('.precio span').textContent,
        numberTikects: 1,
        id: item.querySelector('a').getAttribute('data-id')
    }

    let isItemOnCar = itemsSelected.some(item => item.id === itemData.id)

    if (isItemOnCar) {
        const UpdateArrayItems = itemsSelected.map(item => {
            if (item.id === itemData.id) {
                item.numberTikects++;
                return item
            } else {
                return item
            }
        })
        itemsSelected = [...UpdateArrayItems]
    } else {
        itemsSelected = [...itemsSelected, itemData]
    }
    createHTML(itemsSelected)
}


function createHTML(collectionItems) {
    cleanHTMLConteinerItemsSelected()

    collectionItems.forEach(element => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>
                <img class="u-full-width image" src="${element.image}"></img>
            </td>
            <td class="tittle">
                ${element.tittle}
            </td>
            <td class="price">
                ${element.price}
            </td>
            <td class="ticktes">
                <span class="button-primary button btn-increment"> + </span>
                ${element.numberTikects}
                <span class="button-primary button btn-decrement"> - </span>
            </td>
            <td>
               <span class="button button-primary btnDeleteItemById" style="color:red"> X </span>
            </td>
        `
        containerItemsSelected.appendChild(tr)
    });
}


function cleanHTMLConteinerItemsSelected() {
    containerItemsSelected.innerHTML = ''
}


function deleteItemById(item) {
    let tittleItem = item.querySelector('.tittle').textContent.trim()
    const result = itemsSelected.filter(items => items.tittle !== tittleItem)
    itemsSelected = [...result]

    createHTML(itemsSelected)
}


function deleteAllItems() {
    itemsSelected = []
    cleanHTMLConteinerItemsSelected()
}


function incrementTickets(itemToIncremet) {
    
    let tittleItem = itemToIncremet.querySelector('.tittle').textContent.trim()

        const result = itemsSelected.map(element => {
            if (element.tittle === tittleItem) {
                element.numberTikects++
                return element
            } else {
                return element
            }
        })
        itemsSelected = [...result]

    createHTML(itemsSelected)
}


function decrementTickets(itemToIncremet) {
    let tittleItem = itemToIncremet.querySelector('.tittle').textContent.trim()

        const result = itemsSelected.map(element => {
            if (element.tittle === tittleItem) {
                --element.numberTikects
                return element
            } else {
                return element
            }
        })
        itemsSelected = [...result]

    createHTML(itemsSelected)
}






