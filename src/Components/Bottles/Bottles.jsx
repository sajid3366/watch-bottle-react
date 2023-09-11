import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStroedCart, removeFromLS } from "../../utilities/localstroge";
import Cart from "../Cart/Cart";

const Bottles = () => {

    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottles.json')
            .then(res => res.json())
            .then(data => setBottles(data))
    }, [])

    // load cart from local stroge
    useEffect(() =>{
        if(bottles.length){
            const storedCart = getStroedCart();
            const savedCart = [];
            for(const id of storedCart){
                // console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id);
                if(bottle){
                    savedCart.push(bottle);
                }
            }
            console.log(savedCart);
            setCart(savedCart);

        }

    },[bottles])

    const handleAddToCart = bottle =>{
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLS(bottle.id);
    }

    const handleRemoveFromCart = id =>{
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart);
        removeFromLS(id);

    }

    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
            <Cart 
                cart={cart}
                handleRemoveFromCart={handleRemoveFromCart}
            >
            </Cart>
            <div className="bottle-container">
                {
                    bottles.map(bottle => <Bottle 
                    key={bottle.id}
                    bottle={bottle}
                    handleAddToCart={handleAddToCart}
                    ></Bottle>)
                }
            </div>

        </div>
    );
};

export default Bottles;