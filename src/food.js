const foodSection = document.querySelector('#food-section');
const plus = document.querySelector('.plus');
const cartIcon = document.querySelector('.cart-icon');

const cartDiv = document.querySelector('.cart-icon-div')
const cartDisplay = document.querySelector('.cartDisplay')

/* SIDE BAR DOCUMENT QUERY */
const newCartIcon = document.querySelector('.newCarticon');
const sideBarSection = document.querySelector('.sideBarSection');
const cartDataDisplay = document.querySelector('#sideBarCart');
const subTotal = document.querySelector('.subtotal-p');
const deliveryP = document.querySelector('.delivery-p');
const totalP = document.querySelector('.total-p');
const paymentBtn = document.querySelector('.checkout-button')
const paymentPage = document.querySelector('#payment')

const cartItems = document.querySelector('.cartItems')
const payment = document.querySelector('.payment')

const paymentButtonDiv = document.querySelector('.payment-div')
const checkoutButtonDiv = document.querySelector('.checkout-div')
const payButtonDiv = document.querySelector('.pay-div')

const email = document.getElementById('email')
const cardNumber = document.getElementById('cardNumber')
const expiry = document.getElementById('expiry')
const cvv = document.getElementById('cvv')

let cartData = JSON.parse(localStorage.getItem('cartObject')) || [];

const foodMainSection = () => {
    foodSection.innerHTML = foodData.map((data) => {
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
foodMainSection()

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
    subTotalBill()
    calculateDeliveryFee()
    calculateTotal()
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
    subTotalBill()
    calculateTotal()
    calculateDeliveryFee()
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
            const searchId = foodData.find((x) => x.id === data.id)  || shoeData.find((y) => y.id === data.id) || clothData.find((x) => x.id === data.id) 
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

/* THIS FUNCTION HELPS TO CALCULATE WHAT THE DELIVERY FEE WOULD BE */
const calculateDeliveryFee = (subtotal) => {
    generateMainCartPage()
    if (subtotal % 2 === 0) {
        return 0.005 * subtotal;
    } else {
        return 0.005;
    }
}

/* FUNCTION TO GET THE SUB-TOTAL AMOUNT */
const subTotalBill = () => {
    const subtotal = cartData.map((x) => {
        const searchId = shoeData.find((data) => data.id === x.id) || foodData.find((data) => data.id === x.id) || clothData.find((data) => data.id === x.id) 
        return (
            x.item * searchId.price
        )
    }).reduce((x,y) => x+y, 0)
    generateMainCartPage()

    const deliveryFee = calculateDeliveryFee(subtotal);
    subTotal.innerHTML = '$' + subtotal;
    deliveryP.innerHTML = '$' + deliveryFee;

    return subtotal + deliveryFee;
}
subTotalBill()

/* THIS FUNCTION HELPS TO CALCULATE THE ADDITION OF BOTH THE DELIVERY FEE AND SUB-TOTAL FEE */
const calculateTotal = () => {
    const total = subTotalBill();
    totalP.innerHTML = '$' + total;
    generateMainCartPage()
}
calculateTotal();

/* FUNCTION TO CANCEL THE CART DETAILS */
const cancelCartObject = (id) => {
    cartData = cartData.filter((data) => data.id !== id);
    generateMainCartPage()
    subTotalBill()
    calculateDeliveryFee()
    calculateTotal()
    localStorage.setItem('cartObject', JSON.stringify(cartData))
}
cancelCartObject()

/* PAYMENT BUTTON */
const makePaymentBtnToggle = () => {
    if (cartItems.style.display === 'block' && payment.style.display === 'none' && paymentButtonDiv.style.display === 'block' && checkoutButtonDiv.style.display === 'none' && payButtonDiv.style.display === 'none') {
        cartDataDisplay.style.display = 'none';
        payment.style.display = 'block'
        paymentButtonDiv.style.display = 'none'
        checkoutButtonDiv.style.display = 'block'
        payButtonDiv.style.display = 'block'
        calculation()
    } else {
        cartDataDisplay.style.display = 'block';
        payment.style.display = 'none'
        paymentButtonDiv.style.display = 'block'
        checkoutButtonDiv.style.display = 'none'
        payButtonDiv.style.display = 'none'
        calculation()
    }
} 

const payNow = () => {
    if(email.value && cardNumber.value && expiry.value && cvv.value) {
        alert('Payment made successfully');
        email.value = ''
        cardNumber.value = ''
        expiry.value = ''
        cvv.value = ''

        localStorage.removeItem('cartObject')
        generateMainCartPage()
    }
}
payNow()