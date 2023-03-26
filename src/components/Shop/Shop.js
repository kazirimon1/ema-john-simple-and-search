import React, { useEffect, useState } from 'react';
import { addToDb, getStoresCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // console.log('products load before fetch');
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    useEffect(() => {
        const storedCart = getStoresCart()
        const savaCart = []
        for (const id in storedCart) {
            const addedProduct = (products.find(product => product.id === id))
            if (addedProduct) {
                const quantity = storedCart[id]
                addedProduct.quantity = quantity
                savaCart.push(addedProduct)
            }
        }
        setCart(savaCart)

    }, [products])

    /*  useEffect(()=>{
         console.log('local storage frist line',products);
         const sotresCart= getStoresCart();
         const saveCart = [];
         for(const id in sotresCart){
             const addedProduct=( products.find(product=>product.id ===id))
 
             if(addedProduct){
                 const quantity = sotresCart[id]
                 addedProduct.quantity=quantity
                 saveCart.push(addedProduct)
             }
         }
         setCart(saveCart)
         // console.log("local storage finished");
 
 
     },[products]) */


    const handleAddToCart = (Selectedproduct) => {
        console.log(Selectedproduct);
        let newCart = [];
        const exists = cart.find(product => product.id === Selectedproduct.id)
        if (!exists) {
            Selectedproduct.quantity = 1
            newCart = [...cart, Selectedproduct]
        }
        else {
            const rest = cart.filter(product => product.id !== Selectedproduct.id)
            Selectedproduct.quantity = exists.quantity + 1
            newCart = [...rest, exists]

        }

        setCart(newCart);
        addToDb(Selectedproduct.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>

            </div>
        </div>
    );
};

export default Shop;