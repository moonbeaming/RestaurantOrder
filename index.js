import { menuData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let orderedItems = []

document.addEventListener('click', function(e){
    if(e.target.dataset.additem){
        getOrderSummary(e.target.dataset.additem)
    }

    else if(e.target.dataset.completeOrder){

    }

})



function getOrderSummary(orderID){
    let orderSummaryHTML =''

    let orderObj = menuData.filter(function(item){
        return item.id == orderID
    })[0]

    orderedItems.push(orderObj)
    console.log(orderedItems)

    let orderPrice = 0

    orderedItems.forEach(function(item){
        orderPrice += item.itemPrice
        orderSummaryHTML += `<div class="order-summary-top">
        <div class="ordered-item">
            <div class="ordered-item-name">${item.itemName}</div>
            <div class="remove-item-btn-div">
                <button class="remove-item-btn">remove</button>
            </div>
            <div class="ordered-item-price">$${item.itemPrice}</div>
        </div>
    </div>
`
    })
    document.getElementById('order-total-price').innerHTML = `<div id="order-total-price">$${orderPrice}</div>`
    document.getElementById('order-summary').innerHTML = orderSummaryHTML
    document.getElementsByClassName('your-order')[0].classList.remove('hidden')
    console.log(orderPrice)

    return orderSummaryHTML
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

