import React, { useContext } from 'react';

import { ApiContext } from '../../contexts/apiContext'; // Import the ApiContext for accessing product data

import CardProduct from '../../components/CardProduct'; // Import the CardProduct component for rendering product cards

import * as S from "./styles"; // Import styled components from './styles'

export default function Jewelery() {
    const { jeweleryProducts } = useContext(ApiContext); // Access jewelery product data from ApiContext

    return (
        <>
            <S.Breadcrumb>
                <a href='/'>Home</a>
                <span>/</span>
                <p>Jewelery</p>
            </S.Breadcrumb>

            <S.SomeProducts>
                <ul>
                    {/* Map through each jewelery product and render a CardProduct component */}
                    {jeweleryProducts.map((item) => (
                        <CardProduct
                            key={item.id} // Assign a unique key to the CardProduct
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            category={item.category}
                            image={item.image}
                            rating={item.rating}
                        />
                    ))}
                </ul>
            </S.SomeProducts>
        </>
    );
}
