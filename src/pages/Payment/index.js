import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import * as S from "./styles";

const schema = yup
    .object({
        email: yup
            .string()
            .email("Enter a valid email")
            .required("Email is required"),
    })
    .required();

export default function Payment() {
    const [productsOnCart, setProductsOnCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [qtdItems, setQtdItems] = useState(0);

    useEffect(() => {
        const listaProducts = localStorage.getItem('products');
        setProductsOnCart(JSON.parse(listaProducts) || []);
    }, [productsOnCart]);

    useEffect(() => {
        let totalPrice = 0;
        let qtd = 0;

        productsOnCart.forEach((item, index) => {
            totalPrice += item.price * item.quantity;
            qtd += item.quantity;
        });
        setTotal(totalPrice.toFixed(2));
        setQtdItems(qtd);
    }, []);

    const {
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(userData) {
        console.log(userData);
    }

    return (
        <>
            <S.Breadcrumb>
                <a href='/'>Home</a>
                <span>/</span>
                <p>Delivery</p>
                <span>/</span>
                <p>Payment</p>
            </S.Breadcrumb>

            <S.ContainerMain>
                <S.ContainerLeft onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <S.Form>
                            <h3>Payment only with PayPal</h3>
                            <div>
                                <img src='https://www.larissamuller.com.br/wp-content/uploads/2020/06/paypal.png' alt="PayPal logo" />
                            </div>

                            <S.DivInputCard>
                                <div className='card'>
                                    <input
                                        maxLength="12"
                                        placeholder='Card Number'
                                    />
                                    <input
                                        maxLength="3"
                                        className='securityCode'
                                        type="password"
                                        placeholder='Security Code'
                                    />
                                </div>
                                <select>
                                    <option>Visa</option>
                                    <option>MasterCard</option>
                                </select>
                                <input
                                    type="month"
                                    placeholder='Expiration Date'
                                />
                            </S.DivInputCard>

                            
                        </S.Form>
                    </div>

                    <S.DivButton>
                        <Link to="/donate"><button>Continue</button></Link>
                    </S.DivButton>
                </S.ContainerLeft>

                <S.ContainerRight>
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
                </S.ContainerRight>
            </S.ContainerMain>

        </>
    );
}
