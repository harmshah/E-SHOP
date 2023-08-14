import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import * as S from "./styles";

export default function Delivery() {
    
    const [productsOnCart, setProductsOnCart] = useState([])
    const [total, setTotal] = useState(0)
    const [qtdItems, setQtdItems] = useState(0)

    useEffect(() => {
        const productList = localStorage.getItem('products')
        setProductsOnCart(JSON.parse(productList) || [])
    }, [])

    useEffect(() => {
        let totalPrice = 0;
        let qtd = 0;

        productsOnCart.forEach((item, index) => {
            totalPrice += item.price * item.quantity
            qtd += item.quantity
        })
        setTotal(totalPrice.toFixed(2))
        setQtdItems(qtd)
    }, [productsOnCart])

    return (
        <>
            <S.Breadcrumb>
                <a href='/'>Home</a>
                <span>/</span>
                <p>Delivery</p>
            </S.Breadcrumb>

            <S.ContainerMain>

                <S.ContainerData>
                    <div>
                        <S.Form>
                            <h3>CONTACT INFORMATION</h3>
                            <label>
                                <input
                                    className='inputEmail'
                                    type="email"
                                    placeholder="Email"
                                />
                            </label>
                        </S.Form>
                    </div>

                    <S.DivMid>
                        <h3>DELIVERY</h3>
                        <select disabled>
                            <option>Canada</option>
                        </select>
                        <input
                            type="text"
                            placeholder="ZIP Code"
                        />
                    </S.DivMid>

                    <S.ButtonContinue>
                        <Link to="/payment">
                            <button>Continue</button>
                        </Link>
                    </S.ButtonContinue>
                </S.ContainerData>

                <S.ContainerTotal>
                    {productsOnCart.map(item => (
                        <S.Product key={item.id}>
                            <img src={item.image} alt={item.title} />
                            <p><span>{item.quantity}</span> x {item.title}</p>
                            <span>R${(item.price * item.quantity).toFixed(2)}</span>
                        </S.Product>
                    ))}
                    <S.Total>
                        {productsOnCart.length === 0 ? (
                            <p>No products in the cart.</p>
                        ) : (
                            <>
                                <span>Total:</span>
                                <span>$ {total}</span>
                            </>)}
                    </S.Total>
                </S.ContainerTotal>

            </S.ContainerMain>

        </>
    )
}
