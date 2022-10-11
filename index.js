import { menuData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
// import anime from 'animejs/lib/anime.es.js';
// import anime from "../../../../Luna/node_modules/animejs/lib/anime.es.js"

let orderedItems = []

let modals = document.getElementsByTagName('modal')
let orderSummary = document.getElementById('order-summary')
let orderDiv = document.getElementsByClassName('your-order')[0]

document.addEventListener('click', function(e){
    console.log(e)
    if(e.target.dataset.additem){
        getOrderSummary("add", e.target.dataset.additem)
    }

    else if(e.target.id === "complete-order-btn"){
        openCardDetailsForm()
    }

    else if(e.target.id === "pay-btn"){
        openSuccessModal()
    }

    else if(e.target.className === "close-btn"){
        closeModal()
        // if(e.target.id === "success-modal-btn"){
        //     getOrderSummary(null)
        // }
    }

    else if(e.target.className === "remove-item-btn"){
        removeItem(e.target.id)
    }
})


function getOrderSummary(addOrRemove, orderID){
    let orderSummaryHTML =''

    let orderObj = menuData.filter(function(item){
        return item.id == orderID
    })[0]

    if (addOrRemove === "add"){
        orderedItems.push(orderObj)
    }

    else if (addOrRemove === "remove"){
        const index = orderedItems.indexOf(orderID)
        orderedItems.splice(index, 1)
    }

    console.log("ordered items are")
    console.log(orderedItems)

    let orderPrice = 0

    orderedItems.forEach(function(item){
        orderPrice += item.itemPrice
        orderSummaryHTML += `<div class="order-summary-top">
        <div class="ordered-item">
            <div class="ordered-item-name">${item.itemName}</div>
            <div class="remove-item-btn-div">
                <button class="remove-item-btn" id="${item.id}">remove</button>
            </div>
            <div class="ordered-item-price">$${item.itemPrice}</div>
        </div>
    </div>
`
    })
    document.getElementById('order-total-price').innerHTML = `<div id="order-total-price">$${orderPrice}</div>`
    orderSummary.innerHTML = orderSummaryHTML

    if (orderedItems.length > 0){
        orderDiv.classList.remove('hidden')
    }
    else{
        orderDiv.classList.add('hidden')
    }

    orderSummary.scrollIntoView({
        behavior: 'smooth'
    });

    return orderSummaryHTML
}

function openCardDetailsForm(){
    document.getElementById('card-details-modal').style.display = "flex"
    loadCardDetailsModal.play()
    // var rect = document.getElementById('card-details-modal').getBoundingClientRect();
}

function openSuccessModal(){
    document.getElementById('card-details-modal').style.display = "flex"
    // cardModalTimeline.play()
    // successModalTimeline.play()
    // document.getElementById('card-details-modal').style.setProperty("top",0);
    // document.getElementById('card-details-modal').style.top = 0

    document.getElementById('card-details-modal').style.display = "none"
    document.getElementsByClassName('success-modal')[0].style.display = "flex"
}

function closeModal(){
    for (let i in modals){
        modals[i].style.display="none"
    }
}


function removeItem(i){
    console.log(i)
    getOrderSummary("remove", i)
}

function getPageHTML(){
    let menuHTML = ''
    menuData.forEach(function(item){
        menuHTML += `<div class="item">
                        <div class="item-icon-div">
                            <img class="item-icon" src="${item.itemPic}">
                        </div>
                        <div class="item-description">
                            <div class="item-name">
                                ${item.itemName}
                            </div>
                            <div class="item-ingredients">
                                ${item.itemIngredients}
                            </div>
                            <div class="item-price">
                                $${item.itemPrice}
                            </div>
                        </div>
                        <div class="add-item-div">
                        <button class="add-item-btn" data-additem="${item.id}">+</button>
                        </div>

                    </div>`
    })
    return menuHTML

}

function render(){
    document.getElementById('menuHTML').innerHTML = getPageHTML()
}

render()


var loadMenu = anime({
    targets: ".item",
    translateY: 250,
    direction: "reverse",
    opacity: 0,
    easing: 'linear'
})

var loadCardDetailsModal = anime({
    targets: "#card-details-modal",
    translateY: -250, 
    // opacity: 1
})

// var removeCardDetailsModal = anime({
//     targets: "#card-details-modal",
//     translateX: 250,
//     // opacity: 1,
// })

var cardModalTimeline = anime.timeline({
    targets: "#card-details-modal",
    translateX: -550,
    // opacity: 0,
    // easing: 'linear',
    duration: 600,
})

var successModalTimeline = anime.timeline({
    targets: ".success-modal",
    translateX: -550,
})
