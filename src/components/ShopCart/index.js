// Importing necessary dependencies, components, and styles
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import * as S from './style'; // Importing styles from a file

// Defining the ShopCart component
export default function ShopCart({ sidebar }) {
    // State variables
    const [showCart, setShowCart] = useState(sidebar);
    const [productsOnCart, setProductsOnCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [qtdItems, setQtdItems] = useState(0);
    const [optionsCart, setOptionsCart] = useState(false);

    // Effect to load products from local storage
    useEffect(() => {
        const listaProducts = localStorage.getItem('products');
        setProductsOnCart(JSON.parse(listaProducts) || []);
        console.log(productsOnCart);
    }, []);

    // Callback to update productsOnCart from local storage
    const updateProductsOnCart = useCallback(() => {
        const listaProducts = localStorage.getItem('products');
        setProductsOnCart(JSON.parse(listaProducts) || []);
    }, []);

    // Function to delete a product from the cart
    function deleteProduct(productId) {
        let filteredProducts = productsOnCart.filter((item) => {
            return item.id !== productId;
        });

        setProductsOnCart(filteredProducts);
        localStorage.setItem('products', JSON.stringify(filteredProducts));
        toast.success('Product successfully removed from the cart.', {
            // Toast configuration
        });
    }

    // Functions to manage quantity
    function removeQuantity(qtd, index) {
        if (productsOnCart[index].quantity === 1) {
            // Toast indicating minimum quantity
            return;
        }
        productsOnCart[index].quantity = qtd - 1;
        updateProductsOnCart();
    }

    function addQuantity(qtd, index) {
        productsOnCart[index].quantity = qtd + 1;
        updateProductsOnCart();
    }

    // Effect to calculate total price and quantity
    useEffect(() => {
        let totalPrice = 0;
        let qtd = 0;

        productsOnCart.forEach((item) => {
            totalPrice += item.price * item.quantity;
            qtd += item.quantity;
        });

        setTotal(totalPrice.toFixed(2));
        setQtdItems(qtd);
    }, [productsOnCart]);

    // Rendering the ShopCart component

    return (
        <>
            {showCart && (
                <S.Modal>
                    <S.ShopCart>
                        <S.TitleShopCart>
                            <h1>Shopping Cart</h1>

                            <FaTimes onClick={() => setShowCart(!sidebar)} />
                        </S.TitleShopCart>

                        <S.TitleProducts>
                            <h1>PRODUCT</h1>
                            <h1>SUBTOTAL</h1>

                        </S.TitleProducts>

                        <S.ListProducts>
                            {productsOnCart.map((item, index) => (
                                <li key={item.id}>
                                    <img src={item.image} alt={item.title} />
                                    <div className="boxInfoCart">
                                        <h1>{item.title}</h1>
                                        <div className="quantity">
                                            <button type="button" onClick={() => removeQuantity(item.quantity, index)}>-</button>
                                            <input type="text" value={item.quantity} disabled />
                                            <button type="button" onClick={() => addQuantity(item.quantity, index)}>+</button>
                                        </div>
                                    </div>
                                    <span>${item.price.toFixed(2)}</span>
                                    <FaTrash onClick={() => deleteProduct(item.id)} />
                                </li>
                            ))}

                        </S.ListProducts>

                        {productsOnCart.length > 0 ? (
                            <S.BottomCart>
                               <S.Total>
                                    <h2>Total (without shipping):</h2>
                                    <div className="total">
                                        <h2>$ {total}</h2>
                                        <p>Or up to 10x of $ {(total / 10).toFixed(2)}</p>
                                    </div>
                                </S.Total>
                                <S.FinishBuy>
                                    <Link
                                        to="/products"
                                        className="linkToProducts"
                                        onClick={() => setShowCart(false)}>
                                        <a>See more products</a>
                                    </Link>
                                    <Link
                                        to="/delivery"
                                        className="linkToPayment"
                                        onClick={() => setShowCart(false)}>
                                        Finish purchase
                                    </Link>
                                </S.FinishBuy>
                            </S.BottomCart>) : (
                            <S.DontHasProduct>
                                <p>No products in the cart.</p>
                            </S.DontHasProduct>

                        )}

                    </S.ShopCart>
                </S.Modal>)}

        </>
    )
}