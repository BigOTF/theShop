const cartIcon = document.querySelector('.cart-icon');
const shoeCategory = document.querySelector('#category-shoe-product');
const foodCategory = document.querySelector('#category-food-product');
const clothCategory = document.querySelector('#category-cloth-product');

let cartData = JSON.parse(localStorage.getItem('cartObject')) || [];

const calculation = () => {
    const calculatedData = cartData.length
    cartIcon.innerHTML = calculatedData
}
calculation()

const shoeCategoryLength = () => {
    const dataLength = shoeData.length
    shoeCategory.innerHTML = dataLength
}
shoeCategoryLength()

const foodCategoryLength = () => {
    const dataLength = foodData.length
    foodCategory.innerHTML = dataLength
}
foodCategoryLength()

const clothCategoryLength = () => {
    const dataLength = clothData.length
    clothCategory.innerHTML = dataLength
}
clothCategoryLength()