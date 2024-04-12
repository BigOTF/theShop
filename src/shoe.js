const shoeSection = document.querySelector('#shoe-section');
const plus = document.querySelector('.plus');
const cartIcon = document.querySelector('.cart-icon');

const cartDiv = document.querySelector('.cart-icon-div')
const cartDisplay = document.querySelector('.cartDisplay')

/* SIDE BAR DOCUMENT QUERY */
const newCartIcon = document.querySelector('.newCarticon');
const sideBarSection = document.querySelector('.sideBarSection');
const cartDataDisplay = document.querySelector('#sideBarCart');
const subTotal = document.querySelector('.subtotal-p');

let cartData = JSON.parse(localStorage.getItem('cartObject')) || [];

const shoeMainSection = () => {
    shoeSection.innerHTML = shoeData.map((data) => {
        return (
            `<div class='card'>
                <img src=${data.image} class='card-image'/>
                <div class='card-body'>
                    <p class='card-name'>${data.name}</p>
                    <p class='card-price'>$${data.price}</p>
                
                    <div class='card-button'>
                       <button onclick='addToCart(${data.id})' class='button'>ADD TO CART</button>
                    </div>
                </div>           
            </div>`
        )
    }).join('')
}
shoeMainSection()

/* ADD TO CART ACTS OR WORK SIMILAR TO THE INCREMENT FUNCTION BELOW */
const addToCart = (id) => {
    const findId = cartData.find((data) => data.id === id);
    if(!findId) {
        cartData.push({
            id: id,
            item: 1
        })
    } else {
        findId.item += 1
    }
    calculation()
    getTotalBill()
    localStorage.setItem('cartObject', JSON.stringify(cartData))
}

/* INCREMENT FUNCTION */
const increment = (id) => {
    const findId = cartData.find((data) => data.id === id);
    if(!findId) {
        cartData.push({
            id: id,
            item: 1
        })
    } else {
       findId.item += 1
    }
    updateCount(id)
    localStorage.setItem('cartObject', JSON.stringify(cartData))
}

/* DECREMENT FUNCTION */
const decrement = (id) => {
    const findId = cartData.find((x) => x.id === id);
    if(!findId || findId.item === undefined) return;
    else if(findId.item === 0) return
    else {
       findId.item -= 1
    }
    updateCount(id)
    cartData = cartData.filter((data) => data.item !== 0);
    localStorage.setItem('cartObject', JSON.stringify(cartData))
}

/* UPDATECOUNT FUNCTION */
const updateCount = (id) => {
    const findId = cartData.find((x) => x.id === id);
    document.getElementById(id).innerHTML = findId.item
    calculation()
    getTotalBill()
}

/* CALCULATION FUNCTION */
const calculation = () => {
    const calculatedData = cartData.map((data) => data.item).reduce((x, y) => x + y, 0)
    cartIcon.innerHTML = calculatedData
}
calculation()


/* THE FUNCTIONS BELOW IS FOR THE SIDE BAR */

/* GENERATE SIDEBAR CART DETAILS */
const generateMainCartPage = () => {
    if(cartData.length !== 0) {
        cartDataDisplay.innerHTML = cartData.map((data) => {
            const searchId = shoeData.find((y) => y.id === data.id) || foodData.find((x) => x.id === data.id) || clothData.find((x) => x.id === data.id) 
            return (
               `<div class='sideBar'>
       
                   <div class='sideBarCart'>
                       <div>
                           <img src=${searchId.image} class='sideBarImage'/>
                       </div>
       
                       <div class='sideBarCartBody'>
                           <p>${searchId.name}</p>
                           <p>$${searchId.price}</p>
                           <div class='sideBarCount'>
                               <i onclick="decrement(${searchId.id})" class="bi bi-dash minus"></i>
                               <p id=${searchId.id} class=''>${data === undefined ? 0 : data.item}</p>
                               <i onclick="increment(${searchId.id})" class="bi bi-plus plus"></i>
                           </div>
                       </div>
                   </div>
                  
                   <div>
                       <i class="bi bi-trash3 cancelButton" onclick="cancelCartObject(${data.id})"></i>
                   </div>
               </div>`  
            )
           }).join('')
    } else {
        cartDataDisplay.innerHTML = `Your Cart Data is Empty`
    }
   
}
generateMainCartPage()

/* FUNCTION TO TOGGLE THE SIDE BAR TO DISPLAY AND ALSO HIDE */
const showSideBar = () => {
    if (sideBarSection.style.display === 'none' || sideBarSection.style.display === '') {
        sideBarSection.style.display = 'block';
        calculation()
    } else {
        sideBarSection.style.display = 'none';
        calculation()
    }
}

/* FUNCTION TO GET THE TOTAL AMOUNT */
const getTotalBill = () => {
    subTotal.innerHTML = cartData.map((x) => {
        const searchId = shoeData.find((data) => data.id === x.id) || foodData.find((data) => data.id === x.id) || clothData.find((data) => data.id === x.id) 
        return (
            x.item * searchId.price
        )
    }).reduce((x,y) => x+y, 0)
    generateMainCartPage()
}
getTotalBill()

/* FUNCTION TO CANCEL THE CART DETAILS */
const cancelCartObject = (id) => {
    cartData = cartData.filter((data) => data.id !== id);
    generateMainCartPage()
    getTotalBill()
    
    localStorage.setItem('cartObject', JSON.stringify(cartData))
}
cancelCartObject()