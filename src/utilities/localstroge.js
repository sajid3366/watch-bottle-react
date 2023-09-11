const getStroedCart = () => {
    const stroedCartString = localStorage.getItem('cart');
    if (stroedCartString) {
        return JSON.parse(stroedCartString);
    }
    return [];
}

const saveCartToLS = cart => {
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringified);
}


const addToLS = id => {
    const cart = getStroedCart();
    cart.push(id);
    saveCartToLS(cart);
}

const removeFromLS = id =>{
    const cart = getStroedCart();
    const remaining = cart.filter(idx => idx !== id);
    saveCartToLS(remaining);
}


export { addToLS, getStroedCart, removeFromLS }
